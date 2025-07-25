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
    View,
    WorkspaceLeaf,
} from "obsidian";
import { stripMD } from "obsidian-community-lib";
import { BlockUtils } from "./block_utils";
import { DEFAULT_SETTINGS } from "./constants";
import {
    appHasDailyNotesPluginLoaded,
    getDailyNotePath,
} from "./daily_note_utils";
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
    CanvasView,
    FileModalData,
    HookParameters,
    OpenMode,
    Parameters,
    SearchModalData,
} from "./types";
import {
    getEndAndBeginningOfHeading,
    getFileUri,
    getViewStateFromMode as getOpenViewStateFromMode,
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

        this.addCommand({
            id: "copy-uri-canvas-node",
            name: "Copy URI for selected canvas nodes",
            checkCallback: (checking) => {
                const activeView = (this.app.workspace as any).activeLeaf
                    .view as View;
                if (checking) {
                    return (
                        activeView.getViewType() === "canvas" &&
                        (activeView as CanvasView).canvas.selection.size > 0
                    );
                }
                if (activeView.getViewType() !== "canvas") return false;

                const canvasView = activeView as CanvasView;

                let ids: string[] = [];
                canvasView.canvas.selection.forEach((node) => {
                    ids.push(node.id);
                });

                this.tools.copyURI({
                    canvasnodes: ids.join(","),
                    filepath: activeView.file.path,
                });
            },
        });

        this.addCommand({
            id: "copy-uri-canvas-viewport",
            name: "Copy URI for current canvas viewport",
            checkCallback: (checking) => {
                const activeView = (this.app.workspace as any).activeLeaf
                    .view as View;
                if (checking) {
                    return activeView.getViewType() === "canvas";
                }
                if (activeView.getViewType() !== "canvas") return false;

                const canvasView = activeView as CanvasView;

                const canvas = canvasView.canvas;
                const tx = canvas.tx.toFixed(0),
                    ty = canvas.ty.toFixed(0),
                    tZoom = canvas.tZoom.toFixed(3);
                this.tools.copyURI({
                    filepath: activeView.file.path,
                    canvasviewport: `${tx},${ty},${tZoom}`,
                });
            },
        });

        // Old version, which needed each value to be encoded twice
        this.registerObsidianProtocolHandler("advanced-uri", async (e) => {
            const parameters = e as unknown as Parameters;

            for (const parameter in parameters) {
                (parameters as any)[parameter] = decodeURIComponent(
                    (parameters as any)[parameter]
                );
            }

            this.onUriCall(parameters);
        });

        // New version starting with v1.44.0
        this.registerObsidianProtocolHandler("adv-uri", async (e) => {
            const parameters = e as unknown as Parameters;

            this.onUriCall(parameters);
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

    async onUriCall(parameters: Parameters) {
        /** Allows writing to new created daily note without any `Parameters.mode` */
        let createdDailyNote = false;
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
            if (!appHasDailyNotesPluginLoaded(this.app)) {
                new Notice("Daily notes plugin is not loaded");
                return;
            }
            const moment = window.moment(Date.now());
            const dailyNotePath = await getDailyNotePath(moment, this.app);
            let dailyNoteFile =
                this.app.vault.getAbstractFileByPath(dailyNotePath);
            if (!dailyNoteFile) {
                /// Prevent daily note from being created on existing check
                if (parameters.exists === "true") {
                    parameters.filepath = dailyNotePath;
                } else {
                    dailyNoteFile = await this.app.internalPlugins
                        .getEnabledPluginById("daily-notes")
                        .getDailyNote();

                    createdDailyNote = true;
                }
            }
            if (dailyNoteFile) {
                parameters.filepath = dailyNoteFile.path;
            }
        }
        if (parameters.clipboard === "true") {
            parameters.data = await navigator.clipboard.readText();
        }

        this.chooseHandler(parameters, createdDailyNote);
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
        } else if (parameters.canvasnodes || parameters.canvasviewport) {
            this.handlers.handleCanvas(parameters);
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
            advanceduri: await this.tools.generateURI({ filepath: file.path }),
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

        if (file instanceof TFile) {
            path = file.path;
            const data = await this.app.vault.read(file);
            const lines = data.split("\n");

            // determine which line to perform append operation
            let line: number = undefined; // 1-indexed
            if (parameters.heading) {
                const lineInfo = getEndAndBeginningOfHeading(
                    this.app,
                    file,
                    parameters.heading
                );
                line = lineInfo?.lastLine;
                if (line === undefined) return;

                // When the specified heading has no content, we should
                // add a newline before the separator to make sure the content
                // does not inserted after the heading.
                if (
                    lineInfo.firstLine == lineInfo.lastLine &&
                    parameters.separator
                ) {
                    parameters.separator = "\n" + parameters.separator;
                }
            } else if (parameters.line) {
                line = Number(parameters.line);
            } else {
                line = lines.length;
            }

            line = Math.max(1, line);
            lines[line - 1] =
                (lines[line - 1] ?? "") +
                (parameters.separator ?? "\n") +
                parameters.data;
            dataToWrite = lines.join("\n");
        } else {
            path = file;
            dataToWrite = parameters.data;
        }

        return this.writeAndOpenFile(path, dataToWrite, parameters);
    }

    async prepend(
        file: TFile | string,
        parameters: Parameters
    ): Promise<TFile> {
        let path: string;
        let dataToWrite: string;

        if (file instanceof TFile) {
            path = file.path;
            const data = await this.app.vault.read(file);
            const cache = this.app.metadataCache.getFileCache(file);

            const lines = data.split("\n");

            // determine which line to perform prepend operation
            let line = undefined; // 1-indexed
            if (parameters.heading) {
                line = getEndAndBeginningOfHeading(
                    this.app,
                    file,
                    parameters.heading
                )?.firstLine;
                if (line === undefined) {
                    return;
                } else {
                    line += 1;
                }
            } else if (parameters.line) {
                line = Number(parameters.line);
            } else if (cache.frontmatterPosition) {
                // +1 to convert 0-indexed to 1-indexed
                // another +1 to ensure prepend operation performed
                // at the next line of the end of frontmatter
                line = cache.frontmatterPosition.end.line + 2;
            } else {
                line = 1;
            }

            line = Math.max(1, line);
            lines[line - 1] = `${parameters.data}${
                parameters.separator ?? "\n"
            }${lines[line - 1] ?? ""}`;
            dataToWrite = lines.join("\n");
        } else {
            path = file;
            dataToWrite = parameters.data;
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
            if (
                parameters.line != undefined ||
                parameters.column != undefined ||
                parameters.offset != undefined
            ) {
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
        file?: string | TFile;
        setting?: boolean;
        parameters: Parameters;
        supportPopover?: boolean;
        mode?: "source";
    }): Promise<WorkspaceLeaf | undefined> {
        let leaf: WorkspaceLeaf;
        if (parameters.openmode == "popover" && (supportPopover ?? true)) {
            const hoverEditor =
                this.app.plugins.plugins["obsidian-hover-editor"];
            if (!hoverEditor) {
                new Notice(
                    "Cannot find Hover Editor plugin. Please file an issue."
                );
                this.failure(parameters);
            }

            await new Promise<void>((resolve) => {
                leaf = hoverEditor.spawnPopover(undefined, () => {
                    this.app.workspace.setActiveLeaf(leaf, { focus: true });
                    resolve();
                });
            });
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

            if (file != undefined) {
                let fileIsAlreadyOpened = false;
                if (isBoolean(openMode)) {
                    this.app.workspace.iterateAllLeaves((existingLeaf) => {
                        if (
                            existingLeaf.view.file?.path === parameters.filepath
                        ) {
                            if (fileIsAlreadyOpened && existingLeaf.width == 0)
                                return;
                            fileIsAlreadyOpened = true;

                            this.app.workspace.setActiveLeaf(existingLeaf, {
                                focus: true,
                            });
                            leaf = existingLeaf;
                        }
                    });
                }
            }
            if (!leaf) {
                leaf = this.app.workspace.getLeaf(openMode);
                this.app.workspace.setActiveLeaf(leaf, { focus: true });
            }
        }
        if (file instanceof TFile) {
            await leaf.openFile(file);
        } else if (file != undefined) {
            await this.app.workspace.openLinkText(
                file,
                "/",
                false,
                mode != undefined
                    ? { state: { mode: mode } }
                    : getOpenViewStateFromMode(parameters)
            );
        }

        if (leaf.view instanceof MarkdownView) {
            const viewState = leaf.getViewState();
            if (mode != undefined) {
                viewState.state.mode = mode;
            } else {
                viewState.state = {
                    ...viewState.state,
                    ...getOpenViewStateFromMode(parameters)?.state,
                };
            }
            await leaf.setViewState(viewState);
        }

        return leaf;
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
        const view = this.app.workspace.getActiveViewOfType(MarkdownView);
        if (!view) return;
        const viewState = view.leaf.getViewState();

        const rawLine =
            parameters.line != undefined ? Number(parameters.line) : undefined;
        const rawColumn = parameters.column
            ? Number(parameters.column)
            : undefined;
        viewState.state.mode = "source";
        await view.leaf.setViewState(viewState);

        let line: number, column: number;
        if (parameters.offset != undefined) {
            const pos = view.editor.offsetToPos(Number(parameters.offset));
            line = pos.line;
            column = pos.ch;
        } else {
            line =
                rawLine != undefined
                    ? Math.min(rawLine - 1, view.editor.lineCount() - 1)
                    : view.editor.getCursor().line;
            const maxColumn = view.editor.getLine(line).length - 1;
            column = Math.min(rawColumn - 1, maxColumn);
        }
        view.editor.focus();
        view.editor.setCursor({
            line: line,
            ch: column,
        });
        view.editor.scrollIntoView(
            {
                from: { line: line, ch: column },
                to: { line: line, ch: column },
            },
            true
        );

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
