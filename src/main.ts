import {
    base64ToArrayBuffer,
    getLinkpath,
    MarkdownView,
    normalizePath,
    Notice,
    parseFrontMatterAliases,
    Platform,
    Plugin,
    TFile,
    TFolder,
} from "obsidian";
import { stripMD } from "obsidian-community-lib";
import {
    appHasDailyNotesPluginLoaded,
    createDailyNote,
    getAllDailyNotes,
    getDailyNote,
} from "obsidian-daily-notes-interface";
import { BlockUtils } from "./block_utils";
import { DEFAULT_SETTINGS } from "./constants";
import { getDailyNotePath } from "./daily_note_utils";
import Handlers from "./handlers";
import { CommandModal } from "./modals/command_modal";
import { EnterDataModal } from "./modals/enter_data_modal";
import { FileModal } from "./modals/file_modal";
import { ReplaceModal } from "./modals/replace_modal";
import { SearchModal } from "./modals/search_modal";
import { SettingsTab } from "./settings";
import Tools from "./tools";
import {
    AdvancedURISettings,
    FileModalData,
    HookParameters,
    OpenMode,
    Parameters,
    SearchModalData,
} from "./types";
import {
    getEndAndBeginningOfHeading,
    getFileUri,
    getViewStateFromMode,
} from "./utils";
import { WorkspaceModal } from "./modals/workspace_modal";

export default class AdvancedURI extends Plugin {
    settings: AdvancedURISettings;
    lastParameters?: Object;
    handlers = new Handlers(this);
    tools = new Tools(this);

    async onload() {
        await this.loadSettings();
        this.addSettingTab(new SettingsTab(this.app, this));

        this.addCommand({
            id: "copy-uri-current-file",
            name: "Copy URI for file with options",
            callback: () => this.handlers.handleCopyFileURI(false),
        });

        this.addCommand({
            id: "copy-uri-current-file-simple",
            name: "Copy URI for current file",
            callback: () => this.handlers.handleCopyFileURI(true),
        });

        this.addCommand({
            id: "copy-uri-daily",
            name: "Copy URI for daily note",
            callback: () => new EnterDataModal(this).open(),
        });

        this.addCommand({
            id: "copy-uri-search-and-replace",
            name: "Copy URI for search and replace",
            callback: () => {
                const fileModal = new FileModal(
                    this,
                    "Used file for search and replace"
                );
                fileModal.open();
                fileModal.onChooseItem = (filePath: FileModalData) => {
                    const searchModal = new SearchModal(this);
                    searchModal.open();
                    searchModal.onChooseSuggestion = (
                        item: SearchModalData
                    ) => {
                        new ReplaceModal(this, item, filePath?.source).open();
                    };
                };
            },
        });

        this.addCommand({
            id: "copy-uri-command",
            name: "Copy URI for command",
            callback: () => {
                const fileModal = new FileModal(
                    this,
                    "Select a file to be opened before executing the command"
                );
                fileModal.open();
                fileModal.onChooseItem = (item: FileModalData) => {
                    new CommandModal(this, item?.source).open();
                };
            },
        });

        this.addCommand({
            id: "copy-uri-block",
            name: "Copy URI for current block",
            checkCallback: (checking) => {
                const view =
                    this.app.workspace.getActiveViewOfType(MarkdownView);
                if (checking) return view != undefined;
                const id = BlockUtils.getBlockId(this.app);
                if (id) {
                    this.tools.copyURI({
                        filepath: view.file.path,
                        block: id,
                    });
                }
            },
        });

        this.addCommand({
            id: "copy-uri-workspace",
            name: "Copy URI for workspace",
            callback: () => {
                const modal = new WorkspaceModal(this);
                modal.open();
            },
        });

        this.registerObsidianProtocolHandler("advanced-uri", async (e) => {
            const parameters = e as unknown as Parameters;

            /** Allows writing to new created daily note without any `Parameters.mode` */
            let createdDailyNote = false;
            for (const parameter in parameters) {
                (parameters as any)[parameter] = decodeURIComponent(
                    (parameters as any)[parameter]
                );
            }
            this.lastParameters = { ...parameters };
            if (parameters.uid) {
                const res = this.tools.getFileFromUID(parameters.uid)?.path;
                if (res != undefined) {
                    parameters.filepath = res;
                    parameters.uid = undefined;
                }
            } else if (parameters.filename) {
                let file = this.app.metadataCache.getFirstLinkpathDest(
                    parameters.filename,
                    ""
                );
                if (!file) {
                    file = this.app.vault
                        .getMarkdownFiles()
                        .find((file) =>
                            parseFrontMatterAliases(
                                this.app.metadataCache.getFileCache(file)
                                    .frontmatter
                            )?.includes(parameters.filename)
                        );
                }
                const parentFolder = this.app.fileManager.getNewFileParent(
                    this.app.workspace.getActiveFile()?.path
                );
                const parentFolderPath = parentFolder.isRoot()
                    ? ""
                    : parentFolder.path + "/";
                parameters.filepath =
                    file?.path ??
                    parentFolderPath + normalizePath(parameters.filename);
            }
            if (parameters.filepath) {
                parameters.filepath = normalizePath(parameters.filepath);
                const index = parameters.filepath.lastIndexOf(".");
                const extension = parameters.filepath.substring(
                    index < 0 ? parameters.filepath.length : index
                );

                if (extension === "") {
                    parameters.filepath = parameters.filepath + ".md";
                }
            } else if (parameters.daily === "true") {
                if (!appHasDailyNotesPluginLoaded()) {
                    new Notice("Daily notes plugin is not loaded");
                    return;
                }
                const moment = window.moment(Date.now());
                const allDailyNotes = getAllDailyNotes();
                let dailyNote = getDailyNote(moment, allDailyNotes);
                if (!dailyNote) {
                    /// Prevent daily note from being created on existing check
                    if (parameters.exists === "true") {
                        parameters.filepath = await getDailyNotePath(moment);
                    } else {
                        dailyNote = await createDailyNote(moment);

                        // delay to let Obsidian index and generate CachedMetadata
                        await new Promise((r) => setTimeout(r, 500));

                        createdDailyNote = true;
                    }
                }
                if (dailyNote !== undefined) {
                    parameters.filepath = dailyNote.path;
                }
            }
            if (parameters.clipboard === "true") {
                parameters.data = await navigator.clipboard.readText();
            }

            this.chooseHandler(parameters, createdDailyNote);
        });
        this.registerObsidianProtocolHandler(
            "hook-get-advanced-uri",
            async (e) => {
                const parameters = e as unknown as HookParameters;
                for (const parameter in parameters) {
                    (parameters as any)[parameter] = decodeURIComponent(
                        (parameters as any)[parameter]
                    );
                }
                const file = this.app.workspace.getActiveFile();
                if (file) {
                    this.hookSuccess(parameters, file);
                } else {
                    this.failure(parameters, {
                        errorMessage: "No file opened",
                    });
                }
            }
        );

        this.registerEvent(
            this.app.workspace.on("file-menu", (menu, file, source) => {
                if (
                    !(
                        source === "more-options" ||
                        source === "tab-header" ||
                        source == "file-explorer-context-menu"
                    )
                ) {
                    return;
                }

                if (!(file instanceof TFile)) {
                    return;
                }

                menu.addItem((item) => {
                    item.setTitle(`Copy Advanced URI`)
                        .setIcon("link")
                        .setSection("info")
                        .onClick((_) =>
                            this.handlers.handleCopyFileURI(true, file)
                        );
                });
            })
        );
    }

    async chooseHandler(parameters: Parameters, createdDailyNote: boolean) {
        if (parameters["enable-plugin"] || parameters["disable-plugin"]) {
            this.handlers.handlePluginManagement(parameters);
        } else if (parameters.frontmatterkey) {
            this.handlers.handleFrontmatterKey(parameters);
        } else if (parameters.workspace || parameters.saveworkspace == "true") {
            this.handlers.handleWorkspace(parameters);
        } else if (parameters.commandname || parameters.commandid) {
            this.handlers.handleCommand(parameters);
        } else if (parameters.bookmark) {
            this.handlers.handleBookmarks(parameters);
        } else if (parameters.eval) {
            this.handlers.handleEval(parameters);
        } else if (parameters.filepath && parameters.exists === "true") {
            this.handlers.handleDoesFileExist(parameters);
        } else if (parameters.data) {
            this.handlers.handleWrite(parameters, createdDailyNote);
        } else if (parameters.filepath && parameters.heading) {
            await this.handlers.handleOpen(parameters);
            parameters.filepath = undefined;
            parameters.heading = undefined;
            this.chooseHandler(parameters, createdDailyNote);
        } else if (parameters.filepath && parameters.block) {
            await this.handlers.handleOpen(parameters);
            parameters.filepath = undefined;
            parameters.block = undefined;
            this.chooseHandler(parameters, createdDailyNote);
        } else if (
            (parameters.search || parameters.searchregex) &&
            parameters.replace != undefined
        ) {
            this.handlers.handleSearchAndReplace(parameters);
        } else if (parameters.search) {
            this.handlers.handleSearch(parameters);
        } else if (parameters.filepath) {
            this.handlers.handleOpen(parameters);
        } else if (parameters.block) {
            this.handlers.handleOpenBlock(parameters);
        } else if (parameters.settingid) {
            this.handlers.handleOpenSettings(parameters);
        } else if (parameters.updateplugins) {
            this.handlers.handleUpdatePlugins(parameters);
        }
    }

    async hookSuccess(parameters: Parameters, file: TFile): Promise<void> {
        if (!parameters["x-success"]) return;

        const options = {
            title: stripMD(file.name),
            advanceduri: await this.tools.generateURI(
                { filepath: file.path },
                false
            ),
            urlkey: "advanceduri",
            fileuri: getFileUri(this.app, file),
        };
        this.success(parameters, options);
    }

    success(parameters: Parameters, options?: Record<string, any>): void {
        if (parameters["x-success"]) {
            const url = new URL(parameters["x-success"]);
            for (const param in options) {
                url.searchParams.set(param, options[param]);
            }
            window.open(url.toString());
        }
    }

    failure(parameters: Parameters, options?: Record<string, any>): void {
        if (parameters["x-error"]) {
            const url = new URL(parameters["x-error"]);
            for (const param in options) {
                url.searchParams.set(param, options[param]);
            }
            window.open(url.toString());
        }
    }

    async append(file: TFile | string, parameters: Parameters): Promise<TFile> {
        let path: string;
        let dataToWrite: string;
        if (parameters.heading) {
            if (file instanceof TFile) {
                path = file.path;
                const line = getEndAndBeginningOfHeading(
                    this.app,
                    file,
                    parameters.heading
                )?.lastLine;
                if (line === undefined) return;

                const data = await this.app.vault.read(file);
                const lines = data.split("\n");

                lines.splice(line, 0, ...parameters.data.split("\n"));
                dataToWrite = lines.join("\n");
            }
        } else {
            if (file instanceof TFile) {
                path = file.path;
                const fileData = await this.app.vault.read(file);
                if (parameters.line) {
                    let line = Math.max(Number(parameters.line), 0);
                    const lines = fileData.split("\n");
                    lines.splice(line, 0, parameters.data);
                    dataToWrite = lines.join("\n");
                } else {
                    dataToWrite = fileData + "\n" + parameters.data;
                }
            } else {
                path = file;
                dataToWrite = parameters.data;
            }
        }
        return this.writeAndOpenFile(path, dataToWrite, parameters);
    }

    async prepend(
        file: TFile | string,
        parameters: Parameters
    ): Promise<TFile> {
        let path: string;
        let dataToWrite: string;
        if (parameters.heading) {
            if (file instanceof TFile) {
                path = file.path;
                const line = getEndAndBeginningOfHeading(
                    this.app,
                    file,
                    parameters.heading
                )?.firstLine;
                if (line === undefined) return;

                const data = await this.app.vault.read(file);
                const lines = data.split("\n");

                lines.splice(line, 0, ...parameters.data.split("\n"));
                dataToWrite = lines.join("\n");
            }
        } else {
            if (file instanceof TFile) {
                path = file.path;
                const fileData = await this.app.vault.read(file);
                const cache = this.app.metadataCache.getFileCache(file);
                let line = 0;
                if (parameters.line) {
                    line += Math.max(Number(parameters.line) - 1, 0);
                } else if (cache.frontmatterPosition) {
                    line += cache.frontmatterPosition.end.line + 1;
                }
                const lines = fileData.split("\n");
                lines.splice(line, 0, parameters.data);
                dataToWrite = lines.join("\n");
            } else {
                path = file;
                dataToWrite = parameters.data;
            }
        }

        return this.writeAndOpenFile(path, dataToWrite, parameters);
    }

    async writeAndOpenFile(
        outputFileName: string,
        text: string,
        parameters: Parameters
    ): Promise<TFile> {
        const file = this.app.vault.getAbstractFileByPath(outputFileName);

        if (file instanceof TFile) {
            await this.app.vault.modify(file, text);
        } else {
            const parts = outputFileName.split("/");
            const dir = parts.slice(0, parts.length - 1).join("/");
            if (
                parts.length > 1 &&
                !(this.app.vault.getAbstractFileByPath(dir) instanceof TFolder)
            ) {
                await this.app.vault.createFolder(dir);
            }
            const base64regex =
                /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
            if (base64regex.test(text)) {
                await this.app.vault.createBinary(
                    outputFileName,
                    base64ToArrayBuffer(text)
                );
            } else {
                await this.app.vault.create(outputFileName, text);
            }
        }
        this.openExistingFileAndSetCursor(outputFileName, parameters);

        return this.app.vault.getAbstractFileByPath(outputFileName) as TFile;
    }

    async openExistingFileAndSetCursor(file: string, parameters: Parameters) {
        if (parameters.openmode == "silent") return;
        if (this.settings.openFileOnWrite) {
            await this.open({
                file: file,
                setting: this.settings.openFileOnWriteInNewPane,
                parameters,
            });
            if (parameters.line != undefined) {
                await this.setCursorInLine(parameters);
            }
        }
    }

    async open({
        file,
        setting,
        parameters,
        supportPopover,
        mode,
    }: {
        file: string | TFile;
        setting?: boolean;
        parameters: Parameters;
        supportPopover?: boolean;
        mode?: "source";
    }): Promise<void> {
        if (parameters.openmode == "popover" && (supportPopover ?? true)) {
            const hoverEditor =
                this.app.plugins.plugins["obsidian-hover-editor"];
            if (!hoverEditor) {
                new Notice(
                    "Cannot find Hover Editor plugin. Please file an issue."
                );
                this.failure(parameters);
            }

            const leaf = hoverEditor.spawnPopover(undefined, () => {
                this.app.workspace.setActiveLeaf(leaf, { focus: true });
            });

            let tFile: TFile;
            if (file instanceof TFile) {
                tFile = file;
            } else {
                tFile = this.app.vault.getAbstractFileByPath(
                    getLinkpath(file)
                ) as TFile;
            }

            await leaf.openFile(tFile);
        } else {
            let openMode: OpenMode | boolean = setting;
            if (parameters.newpane !== undefined) {
                openMode = parameters.newpane == "true";
            }
            if (parameters.openmode !== undefined) {
                if (
                    parameters.openmode == "true" ||
                    parameters.openmode == "false"
                ) {
                    openMode = parameters.openmode == "true";
                } else if (parameters.openmode == "popover") {
                    openMode = false;
                } else if (
                    Platform.isMobile &&
                    parameters.openmode == "window"
                ) {
                } else {
                    openMode = parameters.openmode;
                }
            }
            if (openMode == "silent") {
                return;
            }

            // `window` is only supported on desktop
            if (Platform.isMobileApp && openMode == "window") {
                openMode = true;
            }

            let fileIsAlreadyOpened = false;
            if (isBoolean(openMode)) {
                this.app.workspace.iterateAllLeaves((leaf) => {
                    if (leaf.view.file?.path === parameters.filepath) {
                        if (fileIsAlreadyOpened && leaf.width == 0) return;
                        fileIsAlreadyOpened = true;

                        this.app.workspace.setActiveLeaf(leaf, { focus: true });
                    }
                });
            }
            return this.app.workspace.openLinkText(
                file instanceof TFile ? file.path : file,
                "/",
                fileIsAlreadyOpened ? false : openMode,
                mode != undefined
                    ? { state: { mode: mode } }
                    : getViewStateFromMode(parameters)
            );
        }
    }

    async setCursor(parameters: Parameters) {
        const view = this.app.workspace.getActiveViewOfType(MarkdownView);
        if (!view) return;
        const mode = parameters.mode;
        const editor = view.editor;

        let viewState = view.leaf.getViewState();
        viewState.state.mode = "source";

        if (mode === "append") {
            const lastLine = editor.lastLine();
            const lastLineLength = editor.getLine(lastLine).length;
            await view.leaf.setViewState(viewState, { focus: true });

            editor.setCursor({ ch: lastLineLength, line: lastLine });
        } else if (mode === "prepend") {
            await view.leaf.setViewState(viewState, { focus: true });

            editor.setCursor({ ch: 0, line: 0 });
        }

        await new Promise((resolve) => setTimeout(resolve, 10));

        if (parameters.viewmode == "preview") {
            viewState.state.mode = "preview";
            await view.leaf.setViewState(viewState);
        }
    }

    async setCursorInLine(parameters: Parameters) {
        const rawLine = Number(parameters.line);
        const view = this.app.workspace.getActiveViewOfType(MarkdownView);
        if (!view) return;
        const viewState = view.leaf.getViewState();
        viewState.state.mode = "source";
        await view.leaf.setViewState(viewState);

        const line = Math.min(rawLine - 1, view.editor.lineCount() - 1);
        view.editor.focus();
        view.editor.setCursor({
            line: line,
            ch: view.editor.getLine(line).length,
        });

        await new Promise((resolve) => setTimeout(resolve, 10));

        if (parameters.viewmode == "preview") {
            viewState.state.mode = "preview";
            await view.leaf.setViewState(viewState);
        }
    }

    async loadSettings() {
        this.settings = Object.assign(DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }
}
