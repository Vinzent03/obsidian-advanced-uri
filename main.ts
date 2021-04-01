import { App, normalizePath, Notice, Plugin, PluginSettingTab, Setting, TFile } from "obsidian";

const DEFAULT_SETTINGS: AdvancedURISettings = {
    openFileOnWrite: true
};

interface AdvancedURISettings {
    openFileOnWrite: boolean;
}
interface Parameters {
    workspace: string;
    filepath: string;
    data: string;
    mode: "override" | "append" | "prepend";
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
                const workspaces = (this.app as any).internalPlugins.plugins.workspaces;
                if (workspaces.enabled) {
                    workspaces.instance.loadWorkspace(parameters.workspace);
                } else {
                    new Notice("Workspaces plugin is not enabled");
                }
            }
            else if (parameters.filepath && parameters.data) {
                this.handleWrite(parameters);
            } else if (parameters.filepath && parameters.heading) {
                this.app.workspace.openLinkText(parameters.filepath + "#" + parameters.heading, "");
            } else if (parameters.filepath && parameters.block) {
                this.app.workspace.openLinkText(parameters.filepath + "#^" + parameters.block, "");
            }
        });
    }

    async handleWrite(parameters: Parameters) {
        let path = normalizePath(parameters.filepath);
        if (!path.contains(".")) {
            path = path + ".md";
        }
        const file = this.app.vault.getAbstractFileByPath(path);

        if (parameters.mode === "override") {
            this.writeAndOpenFile(path, parameters.data);
        }
        else if (parameters.mode === "prepend") {
            if (file instanceof TFile) {
                const fileData = await this.app.vault.read(file);
                const dataToWrite = parameters.data + "\n" + fileData;
                this.writeAndOpenFile(path, dataToWrite);
            }
        }
        else if (parameters.mode === "append") {
            if (file instanceof TFile) {
                const fileData = await this.app.vault.read(file);
                const dataToWrite = fileData + "\n" + parameters.data;
                this.writeAndOpenFile(path, dataToWrite);
            }
        }
        else if (file instanceof TFile) {
            new Notice("File already exists");
        }
        else {
            this.writeAndOpenFile(path, parameters.data);
        }
    }

    async writeAndOpenFile(outputFileName: string, text: string) {
        await this.app.vault.adapter.write(outputFileName, text);
        if (this.settings.openFileOnWrite) {
            let fileIsAlreadyOpened = false;
            this.app.workspace.iterateAllLeaves(leaf => {
                if (leaf.getDisplayText() != "" && outputFileName.startsWith(leaf.getDisplayText())) {
                    fileIsAlreadyOpened = true;
                }
            });
            if (!fileIsAlreadyOpened)
                this.app.workspace.openLinkText(outputFileName, "/", true);
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
