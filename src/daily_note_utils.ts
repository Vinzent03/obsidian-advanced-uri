import { normalizePath } from "obsidian";
import { getDailyNoteSettings } from "obsidian-daily-notes-interface";


//! All of these methods are taken from https://www.npmjs.com/package/obsidian-daily-notes-interface.
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

async function getNotePath(
    directory: string,
    filename: string
): Promise<string> {
    if (!filename.endsWith(".md")) {
        filename += ".md";
    }
    const path = normalizePath(join(directory, filename));

    await ensureFolderExists(path);

    return path;
}

async function ensureFolderExists(path: string): Promise<void> {
    const dirs = path.replace(/\\/g, "/").split("/");
    dirs.pop(); // remove basename

    if (dirs.length) {
        const dir = join(...dirs);
        if (!(window as any).app.vault.getAbstractFileByPath(dir)) {
            await (window as any).app.vault.createFolder(dir);
        }
    }
}

export async function getDailyNotePath(date: any): Promise<string> {

    const { format, folder } = getDailyNoteSettings();

    const filename = date.format(format);
    const normalizedPath = await getNotePath(folder, filename);
    return normalizedPath;
}