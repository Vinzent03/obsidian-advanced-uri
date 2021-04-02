import { App, normalizePath, Notice, Plugin, PluginSettingTab, Setting, TFile } from "obsidian";
import { appHasDailyNotesPluginLoaded, createDailyNote, getAllDailyNotes, getDailyNote } from "obsidian-daily-notes-interface";

const DEFAULT_SETTINGS: AdvancedURISettings = {
    openFileOnWrite: true
};

interface AdvancedURISettings {
    openFileOnWrite: boolean;
}
interface Parameters {
    workspace: string;
    filepath: string;
    daily: "true";
    data: string;
    mode: "overwrite" | "append" | "prepend";
    heading: string;
    block: string;
}

export default class AdvancedURI extends Plugin {
    settings: AdvancedURISettings;

    async onload() {
        await this.loadSettings();
        this.addSettingTab(new SettingsTab(this.app, this));

        this.registerObsidianProtocolHandler("advanced-uri", async (e) => {
            const parameters = e as unknown as Parameters;

            if (parameters.workspace) {
                this.handleWorkspace(parameters.workspace);

            } else if (parameters.filepath && parameters.data) {
                this.handleWrite(parameters);

            } else if (parameters.daily === "true" && parameters.data) {
                this.handleDailyNote(parameters);

            } else if (parameters.filepath && parameters.heading) {
                this.app.workspace.openLinkText(parameters.filepath + "#" + parameters.heading, "");

            } else if (parameters.filepath && parameters.block) {
                this.app.workspace.openLinkText(parameters.filepath + "#^" + parameters.block, "");
            }
        });
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
        if (parameters.mode === "overwrite") {
            this.app.vault.adapter.write(dailyNote.path, parameters.data);

        } else if (parameters.mode === "prepend") {
            if (!dailyNote) {
                dailyNote = await createDailyNote(moment);
            }
            this.prepend(dailyNote, parameters.data);

        } else if (parameters.mode === "append") {
            if (!dailyNote) {
                dailyNote = await createDailyNote(moment);
            }
            this.append(dailyNote, parameters.data);

        } else if (dailyNote) {
            new Notice("File already exists");

        } else {
            dailyNote = await createDailyNote(moment);
            this.writeAndOpenFile(dailyNote.path, parameters.data);
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
                this.app.workspace.openLinkText(outputFileName, "", true);
        }
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
            .setName("Open file in a pane on write")
            .addToggle(cb => cb.onChange(value => {
                this.plugin.settings.openFileOnWrite = value;
                this.plugin.saveSettings();
            }).setValue(this.plugin.settings.openFileOnWrite));

    }
}
