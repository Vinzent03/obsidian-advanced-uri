import { FuzzySuggestModal } from "obsidian";
import AdvancedURI from "../main";
import { FileModalData } from "../types";

export class FileModal extends FuzzySuggestModal<FileModalData> {
    plugin: AdvancedURI;
    constructor(
        plugin: AdvancedURI,
        private placeHolder: string,
        private allowNoFile: boolean = true
    ) {
        super(plugin.app);
        this.plugin = plugin;
        this.setPlaceholder(this.placeHolder);
    }

    getItems(): FileModalData[] {
        let specialItems: FileModalData[] = [];
        if (this.allowNoFile) {
            specialItems.push({
                display: "<Don't specify a file>",
                source: undefined,
            });
        }
        const file = this.app.workspace.getActiveFile();
        if (file) {
            specialItems.push({ display: "<Current file>", source: file.path });
        }
        return [
            ...specialItems,
            ...this.app.vault.getFiles().map((e) => {
                return { display: e.path, source: e.path };
            }),
        ];
    }

    getItemText(item: FileModalData): string {
        return item.display;
    }

    onChooseItem(item: FileModalData, evt: MouseEvent | KeyboardEvent): void {}
}
