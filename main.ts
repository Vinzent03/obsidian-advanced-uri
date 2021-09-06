import { App, Command, FuzzySuggestModal, MarkdownView, normalizePath, Notice, parseFrontMatterAliases, parseFrontMatterEntry, Plugin, PluginSettingTab, Setting, SuggestModal, TFile } from "obsidian";
import { appHasDailyNotesPluginLoaded, createDailyNote, getAllDailyNotes, getDailyNote } from "obsidian-daily-notes-interface";
import { v4 as uuidv4 } from 'uuid';
const DEFAULT_SETTINGS: AdvancedURISettings = {
    openFileOnWrite: true,
    openDailyInNewPane: false,
    openFileOnWriteInNewPane: false,
    openFileWithoutWriteInNewPane: false,
    idField: "id",
    useUID: false,
};

interface AdvancedURISettings {
    openFileOnWrite: boolean;
    openFileOnWriteInNewPane: boolean;
    openDailyInNewPane: boolean;
    openFileWithoutWriteInNewPane: boolean;
    idField: string;
    useUID: boolean;
}

interface Parameters {
    workspace?: string;
    filepath?: string;
    daily?: "true";
    data?: string;
    mode?: "overwrite" | "append" | "prepend";
    heading?: string;
    block?: string;
    commandname?: string,
    commandid?: string,
    search?: string,
    searchregex?: string;
    replace?: string;
    uid?: string;
    filename?: string;
}

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

            for (const parameter in parameters) {
                (parameters as any)[parameter] = decodeURIComponent((parameters as any)[parameter]);
            }
            if (parameters.uid) {
                parameters.filepath = this.getFileFromUID(parameters.uid)?.path;

            }
            else if (parameters.filename) {
                let file = this.app.metadataCache.getFirstLinkpathDest(parameters.filename, "");
                if (!file) {
                    file = this.app.vault.getMarkdownFiles().find(file => parseFrontMatterAliases(this.app.metadataCache.getFileCache(file).frontmatter)?.includes(parameters.filename));
                }
                parameters.filepath = file?.path ?? normalizePath(parameters.filename);
            }
            else if (parameters.filepath) {
                parameters.filepath = normalizePath(parameters.filepath);
                const index = parameters.filepath.lastIndexOf(".");
                const extension = parameters.filepath.substring(index < 0 ? parameters.filepath.length : index);

                if (extension === "") {
                    parameters.filepath = parameters.filepath + ".md";
                }
            }

            if (parameters.workspace) {
                this.handleWorkspace(parameters.workspace);

            } else if (parameters.commandname || parameters.commandid) {
                this.handleCommand(parameters);

            } else if (parameters.filepath && parameters.data) {
                this.handleWrite(parameters);

            } else if (parameters.daily === "true") {
                this.handleDailyNote(parameters);

            } else if (parameters.filepath && parameters.heading) {
                this.app.workspace.openLinkText(parameters.filepath + "#" + parameters.heading, "");

            } else if (parameters.filepath && parameters.block) {
                this.app.workspace.openLinkText(parameters.filepath + "#^" + parameters.block, "");

            } else if ((parameters.search || parameters.searchregex) && parameters.replace != undefined) {
                this.handleSearchAndReplace(parameters);

            } else if (parameters.filepath) {
                this.handleOpen(parameters);
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

    getFileFromUID(uid: string): TFile | undefined {
        const files = this.app.vault.getFiles();
        const idKey = this.settings.idField;
        return files.find(file => parseFrontMatterEntry(this.app.metadataCache.getFileCache(file)?.frontmatter, idKey) == uid);
    }

    handleWorkspace(workspace: string) {
        const workspaces = (this.app as any)?.internalPlugins?.plugins?.workspaces;
        if (!workspaces) {
            new Notice("Cannot find Workspaces plugin. Please file an issue.");

        } else if (workspaces.enabled) {
            workspaces.instance.loadWorkspace(workspace);

        } else {
            new Notice("Workspaces plugin is not enabled");
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
                await this.app.workspace.openLinkText(parameters.filepath, "/");
            }
        }
        if (parameters.commandid) {
            (this.app as any).commands.executeCommandById(parameters.commandid);
        } else if (parameters.commandname) {
            const rawCommands = (this.app as any).commands.commands;
            for (const command in rawCommands) {
                if (rawCommands[command].name === parameters.commandname) {
                    if (rawCommands[command].callback) {
                        rawCommands[command].callback();
                    } else {
                        rawCommands[command].checkCallback();
                    }
                    return;
                }
            }
        }
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
                } catch (error) {
                    new Notice(`Can't parse ${parameters.searchregex} as RegEx`);
                }
            } else {
                data = data.replaceAll(parameters.search, parameters.replace);
            }

            await this.writeAndOpenFile(file.path, data);
        } else {
            new Notice("Cannot find file");
        }
    }

    async handleWrite(parameters: Parameters) {
        const path = parameters.filepath;
        const file = this.app.vault.getAbstractFileByPath(path);

        if (parameters.mode === "overwrite") {
            this.writeAndOpenFile(path, parameters.data);

        } else if (parameters.mode === "prepend") {
            if (file instanceof TFile) {
                this.prepend(file, parameters);
            } else {
                this.prepend(path, parameters);
            }

        } else if (parameters.mode === "append") {
            if (file instanceof TFile) {
                this.append(file, parameters);
            } else {
                this.append(path, parameters);
            }

        } else if (file instanceof TFile) {
            new Notice("File already exists");

        } else {
            this.writeAndOpenFile(path, parameters.data);
        }
    }

    async handleOpen(parameters: Parameters) {
        await this.app.workspace.openLinkText(parameters.filepath, "", this.settings.openFileWithoutWriteInNewPane);
        await this.setCursor(parameters.mode);
    }

    async handleDailyNote(parameters: Parameters) {
        if (!appHasDailyNotesPluginLoaded()) {
            new Notice("Daily notes plugin is not loaded");
            return;
        }
        const moment = (window as any).moment(Date.now());
        const allDailyNotes = getAllDailyNotes();
        let dailyNote = getDailyNote(moment, allDailyNotes);

        if (parameters.data && parameters.mode === "overwrite") {
            this.writeAndOpenFile(dailyNote.path, parameters.data);

        } else if (parameters.data && parameters.mode === "prepend") {
            if (!dailyNote) {
                dailyNote = await createDailyNote(moment);
            }
            this.prepend(dailyNote, parameters);

        } else if (parameters.data && parameters.mode === "append") {
            if (!dailyNote) {
                dailyNote = await createDailyNote(moment);
            }
            this.append(dailyNote, parameters);

        } else if (parameters.data && dailyNote) {
            new Notice("File already exists");

        } else if (parameters.data) {
            dailyNote = await createDailyNote(moment);
            this.writeAndOpenFile(dailyNote.path, parameters.data);
        } else {
            if (!dailyNote) {
                dailyNote = await createDailyNote(moment);
            }
            if (parameters.heading) {
                this.app.workspace.openLinkText(dailyNote.path + "#" + parameters.heading, "", this.settings.openDailyInNewPane);

            } else if (parameters.block) {
                this.app.workspace.openLinkText(dailyNote.path + "#^" + parameters.block, "", this.settings.openDailyInNewPane);
            } else {
                await this.app.workspace.openLinkText(dailyNote.path, "", this.settings.openDailyInNewPane);
            }
            if (parameters.mode) {
                await this.setCursor(parameters.mode);
            }
        }

    }

    async append(file: TFile | string, parameters: Parameters) {
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
        this.writeAndOpenFile(path, dataToWrite);
    }

    async prepend(file: TFile | string, parameters: Parameters) {
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
            let fileData: string;
            if (file instanceof TFile) {
                fileData = await this.app.vault.read(file);
                path = file.path;
            } else {
                path = file;
                fileData = "";
            }
            dataToWrite = parameters.data + "\n" + fileData;
        }
        this.writeAndOpenFile(path, dataToWrite);
    }

    async writeAndOpenFile(outputFileName: string, text: string) {
        await this.app.vault.adapter.write(outputFileName, text);
        if (this.settings.openFileOnWrite) {
            let fileIsAlreadyOpened = false;
            this.app.workspace.iterateAllLeaves(leaf => {
                if ((leaf.view as any).file?.path === outputFileName) {
                    fileIsAlreadyOpened = true;
                }
            });
            if (!fileIsAlreadyOpened)
                this.app.workspace.openLinkText(outputFileName, "", this.settings.openFileOnWriteInNewPane);
        }
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

    async copyURI(parameters: Parameters) {
        let uri = `obsidian://advanced-uri?vault=${this.app.vault.getName()}`;
        const file = this.app.vault.getAbstractFileByPath(parameters.filepath);
        if (this.settings.useUID && file instanceof TFile) {
            parameters.filepath = undefined;
            parameters.uid = await this.getURIFromFile(file);
        }
        for (const parameter in parameters) {

            if ((parameters as any)[parameter] != undefined) {
                uri = uri + `&${parameter}=${encodeURIComponent((parameters as any)[parameter])}`;
            }
        }

        navigator.clipboard.writeText(encodeURI(uri));
        new Notice("Advanced URI copied to your clipboard");
    }

    async getURIFromFile(file: TFile): Promise<string> {
        const fileContent: string = await this.app.vault.read(file);
        const frontmatter = this.app.metadataCache.getFileCache(file).frontmatter;
        let uid = parseFrontMatterEntry(frontmatter, this.settings.idField);
        if (uid) return uid;
        const isYamlEmpty: boolean = ((!frontmatter || frontmatter.length === 0) && !fileContent.match(/^-{3}\s*\n*\r*-{3}/));
        uid = uuidv4();
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
    async loadSettings() {
        this.settings = Object.assign(DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }
}
class SettingsTab extends PluginSettingTab {
    plugin: AdvancedURI;
    constructor(app: App, plugin: AdvancedURI) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        let { containerEl } = this;
        containerEl.empty();
        containerEl.createEl("h2", { text: this.plugin.manifest.name });

        new Setting(containerEl)
            .setName("Open file on write")
            .addToggle(cb => cb.onChange(value => {
                this.plugin.settings.openFileOnWrite = value;
                this.plugin.saveSettings();
            }).setValue(this.plugin.settings.openFileOnWrite));

        new Setting(containerEl)
            .setName("Open file on write in a new pane")
            .setDisabled(this.plugin.settings.openFileOnWrite)
            .addToggle(cb => cb.onChange(value => {
                this.plugin.settings.openFileOnWriteInNewPane = value;
                this.plugin.saveSettings();
            }).setValue(this.plugin.settings.openFileOnWriteInNewPane));

        new Setting(containerEl)
            .setName("Open daily note in a new pane")
            .addToggle(cb => cb.onChange(value => {
                this.plugin.settings.openDailyInNewPane = value;
                this.plugin.saveSettings();
            }).setValue(this.plugin.settings.openDailyInNewPane));

        new Setting(containerEl)
            .setName("Open file without write in new pane")
            .addToggle(cb => cb.onChange(value => {
                this.plugin.settings.openFileWithoutWriteInNewPane = value;
                this.plugin.saveSettings();
            }).setValue(this.plugin.settings.openFileWithoutWriteInNewPane));

        new Setting(containerEl)
            .setName("Use UID instead of file paths")
            .addToggle(cb => cb.onChange(value => {
                this.plugin.settings.useUID = value;
                this.plugin.saveSettings();
            }).setValue(this.plugin.settings.useUID));

        new Setting(containerEl)
            .setName("UID field in frontmatter")
            .addText(cb => cb.onChange(value => {
                this.plugin.settings.idField = value;
                this.plugin.saveSettings();
            }).setValue(this.plugin.settings.idField));

    }
}

interface EnterData {
    mode: string;
    data: string,
    display: string,
    func: Function,
}

class EnterDataModal extends SuggestModal<EnterData> {
    plugin: AdvancedURI;
    //null if for normal write mode, its not associated with a special mode like "append" or "prepend"
    modes = [null, "overwrite", "append", "prepend"];
    file: string | undefined;

    constructor(plugin: AdvancedURI, file?: string) {
        super(plugin.app);
        this.plugin = plugin;
        this.setPlaceholder("Type your data to be written to the file or leave it empty to just open it");
        this.file = file;
    }


    getSuggestions(query: string): EnterData[] {
        if (query == "") query = null;

        let suggestions: EnterData[] = [];
        for (const mode of this.modes) {
            if (!(mode === "overwrite" && !query)) {
                let display: string;
                if (query) {
                    if (mode) {
                        display = `Write "${query}" in ${mode} mode`;
                    } else {
                        display = `Write "${query}"`;
                    }
                } else {
                    if (mode) {
                        display = `Open in ${mode} mode`;
                    } else {
                        display = `Open`;
                    }
                }
                suggestions.push({
                    data: query,
                    display: display,
                    mode: mode,
                    func: () => {
                        if (this.file) {
                            this.plugin.copyURI({
                                filepath: this.file,
                                data: query,
                                mode: mode as Parameters["mode"]
                            });
                        } else {
                            this.plugin.copyURI({
                                daily: "true",
                                data: query,
                                mode: mode as Parameters["mode"]
                            });
                        }
                    }
                });
            }
        }

        return suggestions;
    }

    renderSuggestion(value: EnterData, el: HTMLElement): void {
        el.innerText = value.display;
    };

    onChooseSuggestion(item: EnterData, _: MouseEvent | KeyboardEvent): void {
        item.func();
    };
}

interface FileModalData {
    source: string;
    display: string;
}

class FileModal extends FuzzySuggestModal<FileModalData> {
    plugin: AdvancedURI;
    constructor(plugin: AdvancedURI, private placeHolder: string, private allowNoFile: boolean = true) {
        super(plugin.app);
        this.plugin = plugin;
        this.setPlaceholder(this.placeHolder);
    }

    getItems(): FileModalData[] {
        let specialItems: FileModalData[] = [];
        if (this.allowNoFile) {
            specialItems.push({ display: "<Don't specify a file>", source: undefined });
        }
        const file = this.app.workspace.getActiveFile();
        if (file) {
            specialItems.push({ display: "<Current file>", source: file.path });
        }
        return [...specialItems, ...this.app.vault.getFiles().map(e => { return { display: e.path, source: e.path }; })];
    }

    getItemText(item: FileModalData): string {
        return item.display;
    }

    onChooseItem(item: FileModalData, evt: MouseEvent | KeyboardEvent): void {

    }
}

class CommandModal extends FuzzySuggestModal<Command> {
    plugin: AdvancedURI;
    file: string;
    constructor(plugin: AdvancedURI, file?: string) {
        super(plugin.app);
        this.plugin = plugin;
        this.file = file;
    }

    getItems(): Command[] {
        const rawCommands = (this.app as any).commands.commands;
        const commands: Command[] = Object.keys(rawCommands).map(e => {
            return { id: rawCommands[e].id, name: rawCommands[e].name };
        });
        return commands;
    }

    getItemText(item: Command): string {
        return item.name;
    }

    onChooseItem(item: Command, _: MouseEvent | KeyboardEvent): void {
        this.plugin.copyURI({
            filepath: this.file,
            commandid: item.id
        });
    }
}

interface SearchModalData {
    source: string;
    display: string;
    isRegEx: boolean;
}

class SearchModal extends SuggestModal<SearchModalData> {
    plugin: AdvancedURI;

    constructor(plugin: AdvancedURI) {
        super(plugin.app);
        this.plugin = plugin;
        this.setPlaceholder("Searched text. RegEx is supported");
    }


    getSuggestions(query: string): SearchModalData[] {
        if (query === "") {
            query = "...";
        }
        let regex: RegExp;
        try {
            regex = new RegExp(query);
        } catch (error) { }
        return [
            {
                source: query,
                isRegEx: false,
                display: query
            },
            {
                source: query,
                display: regex ? `As RegEx: ${query}` : `Can't parse RegEx`,
                isRegEx: true
            }
        ];
    }

    renderSuggestion(value: SearchModalData, el: HTMLElement): void {
        el.innerText = value.display;
    };

    onChooseSuggestion(item: SearchModalData, _: MouseEvent | KeyboardEvent): void {

    };
}

class ReplaceModal extends SuggestModal<string> {
    plugin: AdvancedURI;
    emptyText = "Empty text (replace with nothing)";
    constructor(plugin: AdvancedURI, private search: SearchModalData, private filepath: string) {
        super(plugin.app);
        this.plugin = plugin;
        this.setPlaceholder("Replacement text");
    }


    getSuggestions(query: string): string[] {
        if (query === "") {
            query = this.emptyText;
        }
        return [query];
    }

    renderSuggestion(value: string, el: HTMLElement): void {
        el.innerText = value;
    };

    onChooseSuggestion(item: string, _: MouseEvent | KeyboardEvent): void {
        if (this.search.isRegEx) {
            this.plugin.copyURI({
                filepath: this.filepath,
                searchregex: this.search.source,
                replace: item == this.emptyText ? "" : item
            });
        } else {
            this.plugin.copyURI({
                filepath: this.filepath,
                search: this.search.source,
                replace: item == this.emptyText ? "" : item
            });
        }

    };
}