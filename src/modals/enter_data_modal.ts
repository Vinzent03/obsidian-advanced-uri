import { SuggestModal } from "obsidian";
import AdvancedURI from "../main";
import { EnterData, Parameters } from "../types";

export class EnterDataModal extends SuggestModal<EnterData> {
    plugin: AdvancedURI;
    //null if for normal write mode, its not associated with a special mode like "append" or "prepend"
    modes = [null, "overwrite", "append", "prepend"];
    file: string | undefined;

    constructor(plugin: AdvancedURI, file?: string) {
        super(plugin.app);
        this.plugin = plugin;
        this.setPlaceholder("Type your data to be written to the file or leave it empty to just open it");
        this.file = file;
    }


    getSuggestions(query: string): EnterData[] {
        if (query == "") query = null;

        let suggestions: EnterData[] = [];
        for (const mode of this.modes) {
            if (!(mode === "overwrite" && !query)) {
                let display: string;
                if (query) {
                    if (mode) {
                        display = `Write "${query}" in ${mode} mode`;
                    } else {
                        display = `Write "${query}"`;
                    }
                } else {
                    if (mode) {
                        display = `Open in ${mode} mode`;
                    } else {
                        display = `Open`;
                    }
                }
                suggestions.push({
                    data: query,
                    display: display,
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
