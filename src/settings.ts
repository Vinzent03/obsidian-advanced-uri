import { App, PluginSettingTab, Setting } from "obsidian";
import AdvancedURI from "./main";

export class SettingsTab extends PluginSettingTab {
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
            .addToggle(cb => cb
                .setValue(this.plugin.settings.openFileOnWrite)
                .onChange(value => {
                    this.plugin.settings.openFileOnWrite = value;
                    this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName("Open file on write in a new pane")
            .setDisabled(this.plugin.settings.openFileOnWrite)
            .addToggle(cb => cb
                .setValue(this.plugin.settings.openFileOnWriteInNewPane)
                .onChange(value => {
                    this.plugin.settings.openFileOnWriteInNewPane = value;
                    this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName("Open daily note in a new pane")
            .addToggle(cb => cb
                .setValue(this.plugin.settings.openDailyInNewPane)
                .onChange(value => {
                    this.plugin.settings.openDailyInNewPane = value;
                    this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName("Open file without write in new pane")
            .addToggle(cb => cb
                .setValue(this.plugin.settings.openFileWithoutWriteInNewPane)
                .onChange(value => {
                    this.plugin.settings.openFileWithoutWriteInNewPane = value;
                    this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName("Use UID instead of file paths")
            .addToggle(cb => cb
                .setValue(this.plugin.settings.useUID)
                .onChange(value => {
                    this.plugin.settings.useUID = value;
                    this.plugin.saveSettings();
                    this.display();
                })
            );

        if (this.plugin.settings.useUID) {
            new Setting(containerEl)
                .setName("Add filepath parameter")
                .setDesc("When using UID instead of file paths, you can still add the filepath parameter to know what this URI is about. It's NOT actually used.")
                .addToggle(cb => cb
                    .setValue(this.plugin.settings.addFilepathWhenUsingUID)
                    .onChange(value => {
                        this.plugin.settings.addFilepathWhenUsingUID = value;
                        this.plugin.saveSettings();
                    }));
        }
        new Setting(containerEl)
            .setName("UID field in frontmatter")
            .addText(cb => cb
                .setValue(this.plugin.settings.idField)
                .onChange(value => {
                    this.plugin.settings.idField = value;
                    this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName('Donate')
            .setDesc('If you like this Plugin, consider donating to support continued development.')
            .addButton((bt) => {
                bt.buttonEl.outerHTML = "<a href='https://ko-fi.com/F1F195IQ5' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://cdn.ko-fi.com/cdn/kofi3.png?v=3' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>";
            });
    }
}
