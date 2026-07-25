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

        new Setting(containerEl).setName("Open file on write").addToggle((cb) =>
            cb
                .setValue(this.plugin.settings.openFileOnWrite)
                .onChange((value) => {
                    this.plugin.settings.openFileOnWrite = value;
                    void this.plugin.saveSettings();
                })
        );

        new Setting(containerEl)
            .setName("Open file on write in a new pane")
            .setDisabled(this.plugin.settings.openFileOnWrite)
            .addToggle((cb) =>
                cb
                    .setValue(this.plugin.settings.openFileOnWriteInNewPane)
                    .onChange((value) => {
                        this.plugin.settings.openFileOnWriteInNewPane = value;
                        void this.plugin.saveSettings();
                    })
            );

        new Setting(containerEl)
            .setName("Open daily note in a new pane")
            .addToggle((cb) =>
                cb
                    .setValue(this.plugin.settings.openDailyInNewPane)
                    .onChange((value) => {
                        this.plugin.settings.openDailyInNewPane = value;
                        void this.plugin.saveSettings();
                    })
            );

        new Setting(containerEl)
            .setName("Open file without write in new pane")
            .addToggle((cb) =>
                cb
                    .setValue(
                        this.plugin.settings.openFileWithoutWriteInNewPane
                    )
                    .onChange((value) => {
                        this.plugin.settings.openFileWithoutWriteInNewPane =
                            value;
                        void this.plugin.saveSettings();
                    })
            );

        new Setting(containerEl)
            .setName("Use UID instead of file paths")
            .addToggle((cb) =>
                cb.setValue(this.plugin.settings.useUID).onChange((value) => {
                    this.plugin.settings.useUID = value;
                    void this.plugin.saveSettings();
                    this.display();
                })
            );

        new Setting(containerEl)
            .setName("Include vault name/ID parameter")
            .addToggle((cb) =>
                cb
                    .setValue(this.plugin.settings.includeVaultName)
                    .onChange((value) => {
                        this.plugin.settings.includeVaultName = value;
                        void this.plugin.saveSettings();
                        this.display();
                    })
            );

        if (this.plugin.settings.includeVaultName) {
            new Setting(containerEl)
                .setName("Vault identifying parameter")
                .setDesc(
                    "Choose whether to use the vault Name or its internal ID as the identifying parameter."
                )
                .addDropdown((cb) =>
                    cb
                        .addOption("name", "Name")
                        .addOption("id", "ID")
                        .setValue(this.plugin.settings.vaultParam)
                        .onChange((value: "id" | "name") => {
                            this.plugin.settings.vaultParam = value;
                            void this.plugin.saveSettings();
                        })
                );
        }

        if (this.plugin.settings.useUID) {
            new Setting(containerEl)
                .setName("Add filepath parameter")
                .setDesc(
                    "When using UID instead of file paths, you can still add the filepath parameter to know what this URI is about. It's NOT actually used."
                )
                .addToggle((cb) =>
                    cb
                        .setValue(this.plugin.settings.addFilepathWhenUsingUID)
                        .onChange((value) => {
                            this.plugin.settings.addFilepathWhenUsingUID =
                                value;
                            void this.plugin.saveSettings();
                        })
                );
        }
        new Setting(containerEl)
            .setName("UID field in frontmatter")
            .addText((cb) =>
                cb.setValue(this.plugin.settings.idField).onChange((value) => {
                    this.plugin.settings.idField = value;
                    void this.plugin.saveSettings();
                })
            );

        const formatsHeading = new Setting(containerEl)
            .setName("Link formats")
            .setDesc(
                "Define custom link formats to use when using 'Copy formatted URI for ...' commands. Specify a name to identify and the format template. Available variables:"
            )
            .setHeading();

        formatsHeading.descEl
            .createEl("p")
            .setText("{{uri}} - The Advanced URI");
        formatsHeading.descEl.createEl("p").setText("{{path}} - The file path");
        formatsHeading.descEl.createEl("p").setText("{{name}} - The file name");
        formatsHeading.descEl
            .createEl("p")
            .setText("{{folder}} - The path of the file folder");
        formatsHeading.descEl
            .createEl("p")
            .setText(`{{vaultName}} - The vault name`);
        formatsHeading.descEl
            .createEl("p")
            .setText(`{{vaultId}} - The vault id`);
        formatsHeading.descEl
            .createEl("p")
            .setText(
                "{{uid}} - The file's UID, defaults to file name if not available"
            );
        formatsHeading.descEl
            .createEl("p")
            .setText(
                "{{alias}} - The file's first alias, defaults to file name if not available"
            );

        new Setting(containerEl).setName("Add link format").addButton((cb) =>
            cb.setButtonText("Add format").onClick(() => {
                this.plugin.settings.linkFormats.push({
                    name: "",
                    format: "",
                });
                void this.plugin.saveSettings();
                this.display();
            })
        );
        const linkFormats = this.plugin.settings.linkFormats;
        for (let i = 0; i < linkFormats.length; i++) {
            const linkFormatSetting = new Setting(containerEl).setName(
                `#${i + 1} Format`
            );

            linkFormatSetting.addText((cb) =>
                cb
                    .setPlaceholder("Name")
                    .setValue(linkFormats[i].name)
                    .onChange((value) => {
                        linkFormats[i].name = value;
                        void this.plugin.saveSettings();
                    })
            );
            linkFormatSetting.addText((cb) =>
                cb
                    .setPlaceholder("[{{path}}]({{uri}})")
                    .setValue(linkFormats[i].format)
                    .onChange((value) => {
                        linkFormats[i].format = value;
                        void this.plugin.saveSettings();
                    })
            );
            linkFormatSetting.addExtraButton((cb) =>
                cb.setIcon("trash").onClick(() => {
                    linkFormats.splice(i, 1);
                    void this.plugin.saveSettings();
                    this.display();
                })
            );
        }

        new Setting(containerEl).setName("Support").setHeading();

        new Setting(containerEl)
            .setName("Donate")
            .setDesc(
                "If you like this Plugin, consider donating to support continued development."
            )
            .addButton((bt) => {
                const link = createEl("a", {
                    href: "https://ko-fi.com/F1F195IQ5",
                    attr: {
                        target: "_blank",
                        rel: "noopener noreferrer",
                    },
                });
                link.createEl("img", {
                    attr: {
                        height: "36",
                        src: "https://cdn.ko-fi.com/cdn/kofi3.png?v=3",
                        alt: "Buy Me a Coffee at ko-fi.com",
                        style: "border: 0; height: 36px;",
                    },
                });
                bt.buttonEl.replaceWith(link);
            });
    }
}
