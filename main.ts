import { App, Command, FuzzySuggestModal, MarkdownView, normalizePath, Notice, Plugin, PluginSettingTab, Setting, SuggestModal, TFile } from "obsidian";
import { appHasDailyNotesPluginLoaded, createDailyNote, getAllDailyNotes, getDailyNote } from "obsidian-daily-notes-interface";

const DEFAULT_SETTINGS: AdvancedURISettings = {
    openFileOnWrite: true,
    openDailyInNewPane: false,
    openFileOnWriteInNewPane: false,
};

interface AdvancedURISettings {
    openFileOnWrite: boolean;
    openFileOnWriteInNewPane: boolean;
    openDailyInNewPane: boolean;
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
}

export default class AdvancedURI extends Plugin {
    settings: AdvancedURISettings;

    async onload() {
        await this.loadSettings();
        this.addSettingTab(new SettingsTab(this.app, this));


        this.addCommand({
            id: "copy-uri-current-file",
            name: "copy URI for current file",
            callback: () => this.handleCopyFileURI()
        });

        this.addCommand({
            id: "copy-uri-daily",
            name: "copy URI for daily note",
            callback: () => new EnterDataModal(this).open()
        });

        this.addCommand({
            id: "copy-uri-command",
            name: "copy URI for command",
            callback: () => {
                const fileModal = new FileModal(this);
                fileModal.open();
                fileModal.onChooseItem = (item: string) => {
                    if (item === "Without opening a file before") {
                        item = undefined;
                    }
                    new CommandModal(this, item).open();
                };
            }
        });


        this.registerObsidianProtocolHandler("advanced-uri", async (e) => {
            const parameters = e as unknown as Parameters;

            for (const parameter in parameters) {
                (parameters as any)[parameter] = decodeURIComponent((parameters as any)[parameter]);
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

    async handleWrite(parameters: Parameters) {
        let path = normalizePath(parameters.filepath);
        if (!path.endsWith(".md")) {
            path = path + ".md";
        }
        const file = this.app.vault.getAbstractFileByPath(path);

        if (parameters.mode === "overwrite") {
            this.writeAndOpenFile(path, parameters.data);

        } else if (parameters.mode === "prepend") {
            if (file instanceof TFile) {
                this.prepend(file, parameters.data);
            }

        } else if (parameters.mode === "append") {
            if (file instanceof TFile) {
                this.append(file, parameters.data);
            }

        } else if (file instanceof TFile) {
            new Notice("File already exists");

        } else {
            this.writeAndOpenFile(path, parameters.data);
        }
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
            this.prepend(dailyNote, parameters.data);

        } else if (parameters.data && parameters.mode === "append") {
            if (!dailyNote) {
                dailyNote = await createDailyNote(moment);
            }
            this.append(dailyNote, parameters.data);

        } else if (parameters.data && dailyNote) {
            new Notice("File already exists");

        } else if (parameters.data) {
            dailyNote = await createDailyNote(moment);
            this.writeAndOpenFile(dailyNote.path, parameters.data);

        } else {
            if (!dailyNote) {
                dailyNote = await createDailyNote(moment);
            }
            this.app.workspace.openLinkText(dailyNote.path, "", this.settings.openDailyInNewPane);
        }

    }

    async append(file: TFile, data: string) {
        const fileData = await this.app.vault.read(file);
        const dataToWrite = fileData + "\n" + data;
        this.writeAndOpenFile(file.path, dataToWrite);
    }

    async prepend(file: TFile, data: string) {
        const fileData = await this.app.vault.read(file);
        const dataToWrite = data + "\n" + fileData;
        this.writeAndOpenFile(file.path, dataToWrite);
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
        new EnterDataModal(this, view.file.path).open();
    }

    copyURI(parameters: Parameters) {
        let uri = `obsidian://advanced-uri?vault=${this.app.vault.getName()}`;
        for (const parameter in parameters) {
            if ((parameters as any)[parameter]) {
                uri = uri + `&${parameter}=${encodeURIComponent((parameters as any)[parameter])}`;
            }
        }

        navigator.clipboard.writeText(encodeURI(uri));
        new Notice("Advanced URI copied to your clipboard");
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
    modes = ["daily", "write", "overwrite", "append", "prepend"];
    file: string | undefined;

    constructor(plugin: AdvancedURI, file?: string) {
        super(plugin.app);
        this.plugin = plugin;
        this.setPlaceholder("Type your data to be written to the file");
        this.file = file;
    }


    getSuggestions(query: string): EnterData[] {
        if (query == "") query = "...";

        let suggestions: EnterData[] = [];
        for (const mode of this.modes) {
            if (this.file && mode === "daily") {
                continue;
            } else if (!this.file && mode === "daily") {
                suggestions.push({
                    data: query,
                    display: `Without data. Just open daily note`,
                    mode: mode,
                    func: () => this.plugin.copyURI({
                        daily: "true",
                    })

                });
            } else if (mode === "write") {
                suggestions.push({
                    data: query,
                    display: query,
                    mode: mode,
                    func: () => {
                        if (this.file) {
                            this.plugin.copyURI({
                                filepath: this.file,
                                data: query
                            });
                        } else {
                            this.plugin.copyURI({
                                daily: "true",
                                data: query
                            });
                        }
                    }
                });
            } else {
                suggestions.push({
                    data: query,
                    display: `${query} in ${mode} mode`,
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

class FileModal extends FuzzySuggestModal<string> {
    plugin: AdvancedURI;
    file: string;
    constructor(plugin: AdvancedURI, file?: string) {
        super(plugin.app);
        this.plugin = plugin;
        this.file = file;
        this.setPlaceholder("Select a file to be opened before executing the command");
    }

    getItems(): string[] {
        return ["Without opening a file before", ...this.app.vault.getFiles().map(e => e.path)];
    }

    getItemText(item: string): string {
        return item;
    }

    onChooseItem(item: string, evt: MouseEvent | KeyboardEvent): void {

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
