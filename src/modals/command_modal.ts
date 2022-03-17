import { Command, FuzzySuggestModal } from "obsidian";
import AdvancedURI from "../main";

export class CommandModal extends FuzzySuggestModal<Command> {
    plugin: AdvancedURI;
    file: string;
    constructor(plugin: AdvancedURI, file?: string) {
        super(plugin.app);
        this.plugin = plugin;
        this.file = file;
    }

    getItems(): Command[] {
        const rawCommands = this.app.commands.commands;
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