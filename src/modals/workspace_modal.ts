import { FuzzySuggestModal, Notice } from "obsidian";
import AdvancedURI from "../main";

export class WorkspaceModal extends FuzzySuggestModal<string> {
    plugin: AdvancedURI;
    constructor(plugin: AdvancedURI) {
        super(plugin.app);
        this.plugin = plugin;
        this.setPlaceholder("Choose a workspace");
    }

    getItems(): string[] {
        const workspacesPlugin =
            this.app.internalPlugins.getEnabledPluginById("workspaces");
        if (!workspacesPlugin) {
            new Notice("Workspaces plugin is not enabled");
        } else {
            return Object.keys(workspacesPlugin.workspaces);
        }
    }

    getItemText(item: string): string {
        return item;
    }

    onChooseItem(item: string, _: MouseEvent | KeyboardEvent): void {
        this.plugin.tools.copyURI({ workspace: item });
    }
}
