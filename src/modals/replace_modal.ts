import { SuggestModal } from "obsidian";
import AdvancedURI from "../main";
import { SearchModalData } from "../types";

export class ReplaceModal extends SuggestModal<string> {
    plugin: AdvancedURI;
    emptyText = "Empty text (replace with nothing)";
    constructor(
        plugin: AdvancedURI,
        private search: SearchModalData,
        private filepath: string
    ) {
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
    }

    onChooseSuggestion(item: string, _: MouseEvent | KeyboardEvent): void {
        if (this.search.isRegEx) {
            this.plugin.tools.copyURI({
                filepath: this.filepath,
                searchregex: this.search.source,
                replace: item == this.emptyText ? "" : item,
            });
        } else {
            this.plugin.tools.copyURI({
                filepath: this.filepath,
                search: this.search.source,
                replace: item == this.emptyText ? "" : item,
            });
        }
    }
}
