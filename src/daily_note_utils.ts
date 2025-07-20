import { App, normalizePath } from "obsidian";

//! All of these methods are taken from https://www.npmjs.com/package/obsidian-daily-notes-interface.

export function appHasDailyNotesPluginLoaded(app: App): boolean {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dailyNotesPlugin = (<any>app).internalPlugins.plugins["daily-notes"];
    if (dailyNotesPlugin && dailyNotesPlugin.enabled) {
        return true;
    }
}

function join(...partSegments: string[]): string {
    // Split the inputs into a list of path commands.
    let parts: string[] = [];
    for (let i = 0, l = partSegments.length; i < l; i++) {
        parts = parts.concat(partSegments[i].split("/"));
    }
    // Interpret the path commands to get the new resolved path.
    const newParts = [];
    for (let i = 0, l = parts.length; i < l; i++) {
        const part = parts[i];
        // Remove leading and trailing slashes
        // Also remove "." segments
        if (!part || part === ".") continue;
        // Push new path segments.
        else newParts.push(part);
    }
    // Preserve the initial slash if there was one.
    if (parts[0] === "") newParts.unshift("");
    // Turn back into a single string path.
    return newParts.join("/");
}

export async function getDailyNotePath(date: any, app: App): Promise<string> {
    const { format, folder } =
        app.internalPlugins.getEnabledPluginById("daily-notes").options;

    let filename = date.format(format);
    if (!filename.endsWith(".md")) {
        filename += ".md";
    }
    return normalizePath(join(folder, filename));
}
