import { App, Notice, OpenViewState, TFile } from "obsidian";
import { stripMD } from "obsidian-community-lib";
import { Parameters } from "./types";

export function getViewStateFromMode(
    parameters: Parameters
): OpenViewState | undefined {
    return parameters.viewmode
        ? {
              state: {
                  mode: parameters.viewmode,
                  source: parameters.viewmode == "source",
              },
          }
        : undefined;
}

export function copyText(text: string) {
    return navigator.clipboard.writeText(text);
}

export function getAlternativeFilePath(app: App, file: TFile): string {
    const dir = file.parent?.path;
    const formattedDir = dir === "/" ? "" : dir;
    const name = file.name;
    for (let index = 1; index < 100; index++) {
        const base = stripMD(name);
        const alternative =
            formattedDir +
            (formattedDir == "" ? "" : "/") +
            base +
            ` ${index}.md`;

        const exists = app.vault.getAbstractFileByPath(alternative) !== null;
        if (!exists) {
            return alternative;
        }
    }
}

export function getFileUri(app: App, file: TFile): string {
    const url = new URL(app.vault.getResourcePath(file));
    url.host = "localhosthostlocal";
    url.protocol = "file";
    url.search = "";

    url.pathname = decodeURIComponent(url.pathname);
    const res = url.toString().replace("/localhosthostlocal/", "/");
    return res;
}

export function getEndAndBeginningOfHeading(
    app: App,
    file: TFile,
    heading: string
): { lastLine: number; firstLine: number } {
    const cache = app.metadataCache.getFileCache(file);
    const sections = cache.sections;
    const foundHeading = cache.headings?.find((e) => e.heading === heading);

    if (foundHeading) {
        const foundSectionIndex = sections.findIndex(
            (section) =>
                section.type === "heading" &&
                section.position.start.line === foundHeading.position.start.line
        );
        const restSections = sections.slice(foundSectionIndex + 1);

        const nextHeadingIndex = restSections?.findIndex(
            (e) => e.type === "heading"
        );

        const lastSection =
            restSections[
                (nextHeadingIndex !== -1
                    ? nextHeadingIndex
                    : restSections.length) - 1
            ] ?? sections[foundSectionIndex];
        const lastLine = lastSection.position.end.line + 1;

        return {
            lastLine: lastLine,
            firstLine: sections[foundSectionIndex].position.end.line + 1,
        };
    } else {
        new Notice("Can't find heading");
    }
}
