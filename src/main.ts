import { MarkdownView, normalizePath, Notice, parseFrontMatterAliases, parseFrontMatterEntry, Plugin, TFile, TFolder } from "obsidian";
import { stripMD } from "obsidian-community-lib";
import { appHasDailyNotesPluginLoaded, createDailyNote, getAllDailyNotes, getDailyNote } from "obsidian-daily-notes-interface";
import { v4 as uuidv4 } from 'uuid';
import { getDailyNotePath } from "./daily_note_utils";
import { CommandModal } from "./modals/command_modal";
import { EnterDataModal } from "./modals/enter_data_modal";
import { FileModal } from "./modals/file_modal";
import { ReplaceModal } from "./modals/replace_modal";
import { SearchModal } from "./modals/search_modal";
import { SettingsTab } from "./settings";
import { AdvancedURISettings, FileModalData, HookParameters, Parameters, SearchModalData } from "./types";

const DEFAULT_SETTINGS: AdvancedURISettings = {
    openFileOnWrite: true,
    openDailyInNewPane: false,
    openFileOnWriteInNewPane: false,
    openFileWithoutWriteInNewPane: false,
    idField: "id",
    useUID: false,
};

export default class AdvancedURI extends Plugin {
    settings: AdvancedURISettings;

    async onload() {
        await this.loadSettings();
        this.addSettingTab(new SettingsTab(this.app, this));


        this.addCommand({
            id: "copy-uri-current-file",
            name: "copy URI for file",
            callback: () => this.handleCopyFileURI()
        });

        this.addCommand({
            id: "copy-uri-daily",
            name: "copy URI for daily note",
            callback: () => new EnterDataModal(this).open()
        });

        this.addCommand({
            id: "copy-uri-search-and-replace",
            name: "copy URI for search and replace",
            callback: () => {
                const fileModal = new FileModal(this, "Used file for search and replace");
                fileModal.open();
                fileModal.onChooseItem = (filePath: FileModalData) => {
                    const searchModal = new SearchModal(this);
                    searchModal.open();
                    searchModal.onChooseSuggestion = (item: SearchModalData) => {
                        new ReplaceModal(this, item, filePath?.source).open();
                    };
                };
            },
        });

        this.addCommand({
            id: "copy-uri-command",
            name: "copy URI for command",
            callback: () => {
                const fileModal = new FileModal(this, "Select a file to be opened before executing the command");
                fileModal.open();
                fileModal.onChooseItem = (item: FileModalData) => {
                    new CommandModal(this, item?.source).open();
                };
            }
        });


        this.registerObsidianProtocolHandler("advanced-uri", async (e) => {
            const parameters = e as unknown as Parameters;

            /** Allows writing to new created daily note without any `Parameters.mode` */
            let createdDailyNote = false;
            for (const parameter in parameters) {
                (parameters as any)[parameter] = decodeURIComponent((parameters as any)[parameter]);
            }
            if (parameters.uid) {
                const res = this.getFileFromUID(parameters.uid)?.path;
                if (res != undefined) {
                    parameters.filepath = res;
                    parameters.uid = undefined;
                }

            } else if (parameters.filename) {
                let file = this.app.metadataCache.getFirstLinkpathDest(parameters.filename, "");
                if (!file) {
                    file = this.app.vault.getMarkdownFiles().find(file => parseFrontMatterAliases(this.app.metadataCache.getFileCache(file).frontmatter)?.includes(parameters.filename));
                }
                parameters.filepath = file?.path ?? normalizePath(parameters.filename);
            }
            if (parameters.filepath) {
                parameters.filepath = normalizePath(parameters.filepath);
                const index = parameters.filepath.lastIndexOf(".");
                const extension = parameters.filepath.substring(index < 0 ? parameters.filepath.length : index);

                if (extension === "") {
                    parameters.filepath = parameters.filepath + ".md";
                }
            } else if (parameters.daily === "true") {
                if (!appHasDailyNotesPluginLoaded()) {
                    new Notice("Daily notes plugin is not loaded");
                    return;
                }
                const moment = (window as any).moment(Date.now());
                const allDailyNotes = getAllDailyNotes();
                let dailyNote = getDailyNote(moment, allDailyNotes);
                if (!dailyNote) {
                    /// Prevent daily note from being created on existing check
                    if (parameters.exists === "true") {
                        parameters.filepath = await getDailyNotePath(moment);
                    } else {
                        dailyNote = await createDailyNote(moment);

                        // delay to let Obsidian index and generate CachedMetadata
                        await new Promise(r => setTimeout(r, 500));

                        createdDailyNote = true;
                    }
                }
                if (dailyNote !== undefined) {
                    parameters.filepath = dailyNote.path;
                }
            }

            if (parameters.workspace || parameters.saveworkspace == "true") {
                this.handleWorkspace(parameters);

            } else if (parameters.commandname || parameters.commandid) {
                this.handleCommand(parameters);

            } else if (parameters.filepath && parameters.exists === "true") {
                this.handleDoesFileExist(parameters);

            } else if (parameters.filepath && parameters.data) {
                this.handleWrite(parameters, createdDailyNote);

            } else if (parameters.filepath && parameters.heading) {
                this.handleOpen(parameters);

            } else if (parameters.filepath && parameters.block) {
                this.handleOpen(parameters);

            } else if ((parameters.search || parameters.searchregex) && parameters.replace != undefined) {
                this.handleSearchAndReplace(parameters);

            } else if (parameters.filepath) {
                this.handleOpen(parameters);

            } else if (parameters.settingid) {
                this.handleOpenSettings(parameters);

            } else if (parameters.updateplugins) {
                this.handleUpdatePlugins(parameters);

            }
        });
        this.registerObsidianProtocolHandler(
            "hook-get-advanced-uri",
            async (e) => {
                const parameters = e as unknown as HookParameters;
                for (const parameter in parameters) {
                    (parameters as any)[parameter] = decodeURIComponent((parameters as any)[parameter]);
                }
                const activeLeaf = this.app.workspace.activeLeaf;
                const file = activeLeaf.view.file;
                if (activeLeaf && file) {
                    this.hookSuccess(parameters, file);
                } else {

                    this.failure(parameters, { errorMessage: "No file opened" });
                }
            });



        this.registerEvent(
            this.app.workspace.on('file-menu', (menu, _, source) => {
                if (source !== "pane-more-options") {
                    return;
                }
                const view = this.app.workspace.getActiveViewOfType(MarkdownView);
                if (!view) {
                    return;
                }

                menu.addItem((item) => {
                    item.setTitle(`Copy Advanced URI`).setIcon('link')
                        .onClick((_) => this.handleCopyFileURI());
                });
            }));
    }

    async hookSuccess(parameters: Parameters, file: TFile): Promise<void> {
        if (!parameters["x-success"]) return;

        const options = {
            title: stripMD(file.name),
            advanceduri: await this.generateURI({ filepath: file.path }),
            urlkey: "advanceduri",
            fileuri: this.getFileUri(file),
        };
        this.success(parameters, options);
    }

    getFileUri(file: TFile): string {
        const url = new URL(this.app.vault.getResourcePath(file));
        url.host = "localhosthostlocal";
        url.protocol = "file";
        url.search = "";

        url.pathname = decodeURIComponent(url.pathname);
        const res = url.toString().replace("/localhosthostlocal/", "/");
        return res;
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

    getFileFromUID(uid: string): TFile | undefined {
        const files = this.app.vault.getFiles();
        const idKey = this.settings.idField;
        return files.find(file => parseFrontMatterEntry(this.app.metadataCache.getFileCache(file)?.frontmatter, idKey) == uid);
    }

    handleWorkspace(parameters: Parameters) {
        const workspaces = this.app.internalPlugins?.plugins?.workspaces;
        if (!workspaces) {
            new Notice("Cannot find Workspaces plugin. Please file an issue.");
            this.failure(parameters);
        } else if (workspaces.enabled) {
            if (parameters.saveworkspace == "true") {
                const active = workspaces.instance.activeWorkspace;
                workspaces.instance.saveWorkspace(active);
                new Notice(`Saved current workspace to ${active}`);
            }
            if (parameters.workspace != undefined) {
                workspaces.instance.loadWorkspace(parameters.workspace);
            }
            this.success(parameters);
        } else {
            new Notice("Workspaces plugin is not enabled");
            this.failure(parameters);
        }
    }

    async handleCommand(parameters: Parameters) {
        if (parameters.filepath) {
            if (parameters.mode) {
                await this.app.workspace.openLinkText(parameters.filepath, "/", undefined, {
                    state: { mode: "source" }
                });
                const view = this.app.workspace.getActiveViewOfType(MarkdownView);
                if (view) {
                    const editor = view.editor;
                    const data = editor.getValue();
                    if (parameters.mode === "append") {
                        editor.setValue(data + "\n");
                        const lines = editor.lineCount();
                        editor.setCursor({ ch: 0, line: lines });
                    } else if (parameters.mode === "prepend") {
                        editor.setValue("\n" + data);
                        editor.setCursor({ ch: 0, line: 0 });
                    } else if (parameters.mode === "overwrite") {
                        editor.setValue("");
                    }
                }
            } else {
                await this.app.workspace.openLinkText(parameters.filepath, "/", this.settings.openFileWithoutWriteInNewPane, this.getViewStateFromMode(parameters));
            }
        }
        if (parameters.commandid) {
            this.app.commands.executeCommandById(parameters.commandid);
        } else if (parameters.commandname) {
            const rawCommands = this.app.commands.commands;
            for (const command in rawCommands) {
                if (rawCommands[command].name === parameters.commandname) {
                    if (rawCommands[command].callback) {
                        rawCommands[command].callback();
                    } else {
                        rawCommands[command].checkCallback(false);
                    }
                    break;
                }
            }
        }
        this.success(parameters);
    }
    async handleDoesFileExist(parameters: Parameters) {
        const exists = await this.app.vault.adapter.exists(parameters.filepath);

        this.copyText((exists ? 1 : 0).toString());
        this.success(parameters);

    }
    async handleSearchAndReplace(parameters: Parameters) {
        let file: TFile;
        if (parameters.filepath) {

            const abstractFile = this.app.vault.getAbstractFileByPath(parameters.filepath);
            if (abstractFile instanceof TFile) {
                file = abstractFile;
            }
        } else {
            file = this.app.workspace.getActiveFile();
        }

        if (file) {
            let data = await this.app.vault.read(file);
            if (parameters.searchregex) {
                try {
                    const [, , pattern, flags] = parameters.searchregex.match(/(\/?)(.+)\1([a-z]*)/i);
                    const regex = new RegExp(pattern, flags);
                    data = data.replace(regex, parameters.replace);
                    this.success(parameters);
                } catch (error) {
                    new Notice(`Can't parse ${parameters.searchregex} as RegEx`);
                    this.failure(parameters);
                }
            } else {
                data = data.replaceAll(parameters.search, parameters.replace);
                this.success(parameters);
            }

            await this.writeAndOpenFile(file.path, data, parameters);
        } else {
            new Notice("Cannot find file");
            this.failure(parameters);
        }
    }

    async handleWrite(parameters: Parameters, createdDailyNote: boolean = false) {
        const path = parameters.filepath;
        const file = this.app.vault.getAbstractFileByPath(path);
        let outFile: TFile;
        if (parameters.mode === "overwrite") {
            outFile = await this.writeAndOpenFile(path, parameters.data, parameters);
            this.success(parameters);
        } else if (parameters.mode === "prepend") {
            if (file instanceof TFile) {
                outFile = await this.prepend(file, parameters);
            } else {
                outFile = await this.prepend(path, parameters);
            }
            this.success(parameters);
        } else if (parameters.mode === "append") {
            if (file instanceof TFile) {
                outFile = await this.append(file, parameters);
            } else {
                outFile = await this.append(path, parameters);
            }
            this.success(parameters);
        } else if (parameters.mode === "new") {
            if (file instanceof TFile) {
                outFile = await this.writeAndOpenFile(this.getAlternativeFilePath(file), parameters.data, parameters);
                this.hookSuccess(parameters, outFile);
            } else {
                outFile = await this.writeAndOpenFile(path, parameters.data, parameters);
                this.hookSuccess(parameters, outFile);
            }
        } else if (!createdDailyNote && file instanceof TFile) {
            new Notice("File already exists");
            this.failure(parameters);
        } else {
            outFile = await this.writeAndOpenFile(path, parameters.data, parameters);
            this.success(parameters);
        }
        if (parameters.uid) {
            this.writeUIDToFile(outFile, parameters.uid);
        }
    }

    async handleOpen(parameters: Parameters) {
        let fileIsAlreadyOpened = false;
        this.app.workspace.iterateAllLeaves(leaf => {
            if (leaf.view.file?.path === parameters.filepath) {
                fileIsAlreadyOpened = true;
                this.app.workspace.setActiveLeaf(leaf, true, true);
            }
        });
        if (fileIsAlreadyOpened) {
            const leaf = this.app.workspace.activeLeaf;
            if (parameters.viewmode != undefined) {
                let viewState = leaf.getViewState();
                viewState.state.mode = parameters.viewmode;
                if (viewState.state.source != undefined)
                    viewState.state.source = parameters.viewmode == "source";
                await leaf.setViewState(viewState);
            }
        }

        const openInNewPane = parameters.newpane !== undefined ? parameters.newpane == "true" : this.settings.openFileWithoutWriteInNewPane;
        if (parameters.heading != undefined) {
            await this.app.workspace.openLinkText(parameters.filepath + "#" + parameters.heading, "", openInNewPane, this.getViewStateFromMode(parameters));
            const view = this.app.workspace.getActiveViewOfType(MarkdownView);
            if (!view) return;
            const cache = this.app.metadataCache.getFileCache(view.file);
            const heading = cache.headings.find((e) => e.heading === parameters.heading);
            view.editor.focus();
            view.editor.setCursor({ line: heading.position.start.line + 1, ch: 0 });
        }
        else if (parameters.block != undefined) {
            await this.app.workspace.openLinkText(parameters.filepath + "#^" + parameters.block, "", openInNewPane, this.getViewStateFromMode(parameters));
            const view = this.app.workspace.getActiveViewOfType(MarkdownView);
            if (!view) return;
            const cache = this.app.metadataCache.getFileCache(view.file);
            const block = cache.blocks[parameters.block];
            view.editor.focus();
            view.editor.setCursor({ line: block.position.start.line, ch: 0 });
        }
        else {
            if (!fileIsAlreadyOpened)
                await this.app.workspace.openLinkText(parameters.filepath, "", openInNewPane, this.getViewStateFromMode(parameters));
            if (parameters.line != undefined) {
                this.setCursorInLine(parameters.line);
            }
        }
        if (parameters.mode != undefined) {
            await this.setCursor(parameters.mode);
        }
        if (parameters.uid) {
            const view = this.app.workspace.getActiveViewOfType(MarkdownView);

            this.writeUIDToFile(view.file, parameters.uid);
        }
        this.success(parameters);
    }

    async append(file: TFile | string, parameters: Parameters): Promise<TFile> {
        let path: string;
        let dataToWrite: string;
        if (parameters.heading) {
            if (file instanceof TFile) {
                path = file.path;
                const line = this.getEndAndBeginningOfHeading(file, parameters.heading)?.lastLine;
                if (line === undefined) return;

                const data = await this.app.vault.read(file);
                const lines = data.split("\n");

                lines.splice(line, 0, ...parameters.data.split("\n"));
                dataToWrite = lines.join("\n");
            }
        }
        else {
            let fileData: string;
            if (file instanceof TFile) {
                fileData = await this.app.vault.read(file);
                path = file.path;
            } else {
                path = file;
                fileData = "";
            }
            dataToWrite = fileData + "\n" + parameters.data;
        }
        return this.writeAndOpenFile(path, dataToWrite, parameters);
    }

    async prepend(file: TFile | string, parameters: Parameters): Promise<TFile> {
        let path: string;
        let dataToWrite: string;
        if (parameters.heading) {
            if (file instanceof TFile) {
                path = file.path;
                const line = this.getEndAndBeginningOfHeading(file, parameters.heading)?.firstLine;
                if (line === undefined) return;

                const data = await this.app.vault.read(file);
                const lines = data.split("\n");

                lines.splice(line, 0, ...parameters.data.split("\n"));
                dataToWrite = lines.join("\n");
            }

        } else {
            if (file instanceof TFile) {
                const fileData = await this.app.vault.read(file);
                const cache = this.app.metadataCache.getFileCache(file);

                if (cache.frontmatter) {
                    const line = cache.frontmatter.position.end.line;
                    const first = fileData.split("\n").slice(0, line + 1).join("\n");
                    const last = fileData.split("\n").slice(line + 1).join("\n");
                    dataToWrite = first + "\n" + parameters.data + "\n" + last;

                } else {
                    dataToWrite = parameters.data + "\n" + fileData;
                }
                path = file.path;
            } else {
                path = file;
                dataToWrite = parameters.data;
            }
        }

        return this.writeAndOpenFile(path, dataToWrite, parameters);
    }

    async writeAndOpenFile(outputFileName: string, text: string, parameters: Parameters): Promise<TFile> {
        const file = this.app.vault.getAbstractFileByPath(outputFileName);

        if (file instanceof TFile) {
            await this.app.vault.modify(file, text);
        } else {
            const parts = outputFileName.split("/");
            const dir = parts.slice(0, parts.length - 1).join("/");
            if (parts.length > 1 && !(this.app.vault.getAbstractFileByPath(dir) instanceof TFolder)) {
                await this.app.vault.createFolder(dir);
            }

            await this.app.vault.create(outputFileName, text);
        }

        if (this.settings.openFileOnWrite) {
            let fileIsAlreadyOpened = false;
            this.app.workspace.iterateAllLeaves(leaf => {
                if (leaf.view.file?.path === outputFileName) {
                    fileIsAlreadyOpened = true;
                    this.app.workspace.setActiveLeaf(leaf, true, true);
                }
            });
            console.log(parameters);

            if (!fileIsAlreadyOpened)
                await this.app.workspace.openLinkText(outputFileName, "", parameters.newpane !== undefined ? parameters.newpane == "true" : this.settings.openFileOnWriteInNewPane, this.getViewStateFromMode(parameters));
            if (parameters.line != undefined) {
                this.setCursorInLine(parameters.line);
            }
        }

        return this.app.vault.getAbstractFileByPath(outputFileName) as TFile;
    }

    getEndAndBeginningOfHeading(file: TFile, heading: string): { "lastLine": number, "firstLine": number; } {
        const cache = this.app.metadataCache.getFileCache(file);
        const sections = cache.sections;
        const foundHeading = cache.headings?.find(e => e.heading === heading);


        if (foundHeading) {
            const foundSectionIndex = sections.findIndex(section => section.type === "heading" && section.position.start.line === foundHeading.position.start.line);
            const restSections = sections.slice(foundSectionIndex + 1);

            const nextHeadingIndex = restSections?.findIndex(e => e.type === "heading");

            const lastSection = restSections[(nextHeadingIndex !== -1 ? nextHeadingIndex : restSections.length) - 1] ?? sections[foundSectionIndex];
            const lastLine = lastSection.position.end.line + 1;

            return { "lastLine": lastLine, "firstLine": sections[foundSectionIndex].position.end.line + 1 };
        } else {
            new Notice("Can't find heading");
        }
    }

    async setCursor(mode: Parameters["mode"]) {
        const view = this.app.workspace.getActiveViewOfType(MarkdownView);
        if (view) {
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
        }
    }

    setCursorInLine(rawLine: number) {
        const view = this.app.workspace.getActiveViewOfType(MarkdownView);
        if (!view) return;
        const line = Math.min(rawLine - 1, view.editor.lineCount() - 1);
        view.editor.focus();
        view.editor.setCursor({ line: line, ch: view.editor.getLine(line).length });
    }

    handleCopyFileURI() {
        const view = this.app.workspace.getActiveViewOfType(MarkdownView);
        if (!view) return;

        const pos = view.editor.getCursor();
        const cache = this.app.metadataCache.getFileCache(view.file);
        if (cache.headings) {
            for (const heading of cache.headings) {
                if (heading.position.start.line <= pos.line && heading.position.end.line >= pos.line) {
                    this.copyURI({
                        filepath: view.file.path,
                        heading: heading.heading
                    });
                    return;
                }
            }
        }
        if (cache.blocks) {
            for (const blockID of Object.keys(cache.blocks)) {
                const block = cache.blocks[blockID];
                if (block.position.start.line <= pos.line && block.position.end.line >= pos.line) {
                    this.copyURI({
                        filepath: view.file.path,
                        block: blockID
                    });
                    return;
                }
            }
        }
        const fileModal = new FileModal(this, "Choose a file", false);
        fileModal.open();
        fileModal.onChooseItem = (item, _) => {
            new EnterDataModal(this, item.source).open();
        };
    }

    handleOpenSettings(parameters: Parameters) {
        if (this.app.setting.containerEl.parentElement === null) {
            this.app.setting.open();
        }
        if (parameters.settingid == "plugin-browser") {
            this.app.setting.openTabById("community-plugins");
            this.app.setting.activeTab.containerEl.find(".mod-cta").click();
        } else if (parameters.settingid == "theme-browser") {
            this.app.setting.openTabById("appearance");
            this.app.setting.activeTab.containerEl.find(".mod-cta").click();
        } else {
            this.app.setting.openTabById(parameters.settingid);
        }
        this.success(parameters);
    }

    async handleUpdatePlugins(parameters: Parameters) {
        parameters.settingid = "community-plugins";
        this.handleOpenSettings(parameters);
        this.app.setting.activeTab.containerEl.findAll(".mod-cta").last().click();
        new Notice("Waiting 10 seconds");
        await new Promise(resolve => setTimeout(resolve, 10 * 1000));

        if (Object.keys((this.app as any).plugins.updates).length !== 0) {
            this.app.setting.activeTab.containerEl.findAll(".mod-cta").last().click();
        }
        this.success(parameters);
    }

    getAlternativeFilePath(file: TFile): string {
        const dir = file.parent?.path;
        const formattedDir = dir === "/" ? "" : dir;
        const name = file.name;
        for (let index = 1; index < 100; index++) {

            const base = stripMD(name);
            const alternative = formattedDir + (formattedDir == "" ? "" : "/") + base + ` ${index}.md`;

            const exists = this.app.vault.getAbstractFileByPath(alternative) !== null;
            if (!exists) {
                return alternative;
            }
        }
    }

    async generateURI(parameters: Parameters) {
        let uri = `obsidian://advanced-uri?vault=${this.app.vault.getName()}`;
        const file = this.app.vault.getAbstractFileByPath(parameters.filepath);

        if (this.settings.useUID && file instanceof TFile) {
            parameters.filepath = undefined;
            parameters.uid = await this.getUIDFromFile(file);
        }
        for (const parameter in parameters) {

            if ((parameters as any)[parameter] != undefined) {
                uri = uri + `&${parameter}=${encodeURIComponent((parameters as any)[parameter])}`;
            }
        }
        return uri;
    }

    async copyURI(parameters: Parameters) {
        const uri = await this.generateURI(parameters);
        await this.copyText(encodeURI(uri));

        new Notice("Advanced URI copied to your clipboard");
    }

    copyText(text: string) {
        return navigator.clipboard.writeText(text);
    };

    async getUIDFromFile(file: TFile): Promise<string> {
        const frontmatter = this.app.metadataCache.getFileCache(file).frontmatter;
        let uid = parseFrontMatterEntry(frontmatter, this.settings.idField);
        if (uid != undefined) return uid;
        return await this.writeUIDToFile(file, uuidv4());
    };

    async writeUIDToFile(file: TFile, uid: string): Promise<string> {

        const frontmatter = this.app.metadataCache.getFileCache(file)?.frontmatter;
        const fileContent: string = await this.app.vault.read(file);
        const isYamlEmpty: boolean = ((!frontmatter || frontmatter.length === 0) && !fileContent.match(/^-{3}\s*\n*\r*-{3}/));
        let splitContent = fileContent.split("\n");
        if (isYamlEmpty) {
            splitContent.unshift("---");
            splitContent.unshift(`${this.settings.idField}: ${uid}`);
            splitContent.unshift("---");
        }
        else {
            splitContent.splice(1, 0, `${this.settings.idField}: ${uid}`);
        }

        const newFileContent = splitContent.join("\n");
        await this.app.vault.modify(file, newFileContent);
        return uid;
    }

    getViewStateFromMode(parameters: Parameters) {
        return parameters.viewmode ? { state: { mode: parameters.viewmode } } : undefined;
    }
    async loadSettings() {
        this.settings = Object.assign(DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }
}
