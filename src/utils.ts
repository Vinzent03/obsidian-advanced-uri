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

interface UpdateObjectFieldInplaceParams {
    /** The object to update. */
    originalObject: object;
    /**
     * The string key or a string path to the key to update. e.g.: "[key1,key2,0]".
     * Number index in the path should be zero-indexed.
     *
     * When the string path does not exists in the object:
     *
     * - If the content of the key looks like a string, it will be treated as an object key.
     * - If the content of the key looks like an index, it will be treated as an array index.
     *
     * A new object or array will be created at the specified path then.
     * */
    key: string;
    /** The new value to set. */
    data: any;
}

/**
 * Custom error class for key path errors in updateObjectFieldInplace.
 */
export class KeyPathError extends Error {
    public errKey: string;

    constructor(message: string, errKey: string, cause?: unknown) {
        super(message);
        this.name = "KeyPathError";
        this.errKey = errKey;
        if (cause) {
            (this as any).cause = cause;
        }
    }
}

/**
 * Updates a field in the given object in place, supporting nested keys specified as a string path.
 *
 * `-1` or a number index greater than the maximum index could be used to achieve
 * prepend and append operations on arrays. Check comments on `key` parameters for more details.
 *
 * @param params - The parameters for updating the object field.
 *
 * @throws `KeyPathError` if an invalid array key is detected.
 */
export function updateObjectFieldInplace(
    param: UpdateObjectFieldInplaceParams
) {
    const { originalObject, key, data } = param;

    if (key.startsWith("[") && key.endsWith("]")) {
        // frontmatter key is a list
        const keyList = key.substring(1, key.length - 1).split(",");
        let currObj: any = originalObject;

        // iterate through key list
        for (let i = 0; i < keyList.length; i++) {
            // set currKey (and currIndex if current object is array)
            const currKey = keyList[i];
            let currIndex: number | undefined = undefined;
            if (currObj instanceof Array) {
                currIndex = parseInt(currKey);
                if (Number.isNaN(currIndex)) {
                    currIndex = currObj.find((e) => e == currKey);
                }
                if (currIndex === undefined) {
                    throw new KeyPathError(
                        `Failed to resolve or convert "${currKey}" to a valid array index.`,
                        currKey
                    );
                }
                // limited the range of index
                currIndex = Math.min(currIndex, currObj.length);
                currIndex = Math.max(currIndex, -1);
            }
            // at this point, if cache is of `Array` type, currIndex should always be a valid number

            // reach the last key, update data
            if (i == keyList.length - 1) {
                if (currObj instanceof Array) {
                    // prepend if index is -1, or directly update data if index is in range of [0, n]
                    if (currIndex === -1) {
                        currObj.unshift(data);
                    } else {
                        currObj[currIndex] = data;
                    }
                } else {
                    currObj[currKey] = data;
                }
                return;
            }

            // enter next level
            //
            // here if next level is undefined, we need to create a new list/object
            // based on what does the next key looks like.
            // - looks like an index => create a new list
            // - looks like a string key => create a new object
            let nextKeyLooksLikeIndex = !Number.isNaN(parseInt(keyList[i + 1]));
            const newObj = nextKeyLooksLikeIndex ? [] : {};

            try {
                if (currObj instanceof Array) {
                    if (currIndex >= currObj.length) {
                        currObj.push(newObj);
                        currObj = newObj;
                    } else if (currIndex === -1) {
                        currObj.unshift(newObj);
                        currObj = newObj;
                    } else {
                        currObj = currObj[Math.max(currIndex, 0)];
                    }
                } else {
                    if (currObj[currKey] === undefined) {
                        currObj[currKey] = newObj;
                        currObj = newObj;
                    } else {
                        currObj = currObj[currKey];
                    }
                }
            } catch (e) {
                throw new KeyPathError(
                    `Failed to resolve "${currKey}" as a valid object key`,
                    currKey,
                    e
                );
            }
        }
    } else {
        (originalObject as any)[key] = data;
    }
}

/**
 * Retrieves a field from the given object, supporting nested keys specified as a string path.
 * @param params - The parameters for retrieving the object field.
 * @returns The value at the specified path, or undefined if not found.
 */
export function getObjFieldByPath(params: { obj: any; key: string }): any {
    const { obj: originalObject, key } = params;
    if (key.startsWith("[") && key.endsWith("]")) {
        const list = key.substring(1, key.length - 1).split(",");
        let cache: any = originalObject;
        for (const item of list) {
            if (cache instanceof Array) {
                const index = parseInt(item);
                if (Number.isNaN(index)) {
                    cache = cache.find((e: any) => e == item);
                } else {
                    cache = cache[index];
                }
            } else if (cache && typeof cache === "object") {
                cache = cache[item];
            } else {
                return undefined;
            }
        }
        return cache;
    } else {
        return originalObject ? originalObject[key] : undefined;
    }
}
