import { SuggestModal } from "obsidian";
import AdvancedURI from "../main";
import { SearchModalData } from "../types";

export class SearchModal extends SuggestModal<SearchModalData> {
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
        } catch (error) {}
        return [
            {
                source: query,
                isRegEx: false,
                display: query,
            },
            {
                source: query,
                display: regex ? `As RegEx: ${query}` : `Can't parse RegEx`,
                isRegEx: true,
            },
        ];
    }

    renderSuggestion(value: SearchModalData, el: HTMLElement): void {
        el.innerText = value.display;
    }

    onChooseSuggestion(
        item: SearchModalData,
        _: MouseEvent | KeyboardEvent
    ): void {}
}
