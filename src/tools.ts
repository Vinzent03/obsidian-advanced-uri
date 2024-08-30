import { CachedMetadata, Notice, parseFrontMatterEntry, TFile } from "obsidian";
import { v4 as uuidv4 } from "uuid";
import AdvancedURI from "./main";
import { Parameters } from "./types";
import { copyText } from "./utils";
/**
 * These methods depend on the plugins settings in contrast to the utils.ts file, which's functions are independent of the plugins settings.
 */
export default class Tools {
    constructor(private readonly plugin: AdvancedURI) {}

    app = this.plugin.app;

    get settings() {
        return this.plugin.settings;
    }

    async writeUIDToFile(file: TFile, uid: string): Promise<string> {
        const frontmatter =
            this.app.metadataCache.getFileCache(file)?.frontmatter;
        const fileContent: string = await this.app.vault.read(file);
        const isYamlEmpty: boolean =
            (!frontmatter || frontmatter.length === 0) &&
            !fileContent.match(/^-{3}\s*\n*\r*-{3}/);
        let splitContent = fileContent.split("\n");
        const key = `${this.plugin.settings.idField}:`;
        if (isYamlEmpty) {
            splitContent.unshift("---");
            splitContent.unshift(`${key} ${uid}`);
            splitContent.unshift("---");
        } else {
            const lineIndexOfKey = splitContent.findIndex((line) =>
                line.startsWith(key)
            );
            if (lineIndexOfKey != -1) {
                splitContent[lineIndexOfKey] = `${key} ${uid}`;
            } else {
                splitContent.splice(1, 0, `${key} ${uid}`);
            }
        }

        const newFileContent = splitContent.join("\n");
        await this.app.vault.modify(file, newFileContent);
        return uid;
    }

    async getUIDFromFile(file: TFile): Promise<string> {
        //await parsing of frontmatter
        const cache =
            this.app.metadataCache.getFileCache(file) ??
            (await new Promise<CachedMetadata>((resolve) => {
                const ref = this.app.metadataCache.on("changed", (metaFile) => {
                    if (metaFile.path == file.path) {
                        const cache = this.app.metadataCache.getFileCache(file);
                        this.app.metadataCache.offref(ref);
                        resolve(cache);
                    }
                });
            }));

        const uid = parseFrontMatterEntry(
            cache.frontmatter,
            this.plugin.settings.idField
        );
        if (uid != undefined) {
            if (uid instanceof Array) {
                return uid[0];
            } else {
                return uid;
            }
        }
        return await this.writeUIDToFile(file, uuidv4());
    }

    async generateURI(parameters: Parameters) {
        const prefix = "obsidian://adv-uri";
        let suffix = "";
        const file = this.app.vault.getAbstractFileByPath(parameters.filepath);
        if (this.settings.includeVaultName) {
            suffix += "?vault=";
            if (this.settings.vaultParam == "id" && this.app.appId) {
                suffix += encodeURIComponent(this.app.appId);
            } else {
                suffix += encodeURIComponent(this.app.vault.getName());
            }
        }
        if (
            this.settings.useUID &&
            file instanceof TFile &&
            file.extension == "md"
        ) {
            if (!this.settings.addFilepathWhenUsingUID)
                parameters.filepath = undefined;
            parameters.uid = await this.getUIDFromFile(file);
        }
        const sortedParameterKeys = (
            Object.keys(parameters) as (keyof Parameters)[]
        )
            .filter((key) => parameters[key])
            .sort((a, b) => {
                const first = ["filepath", "filename", "uid", "daily"];
                const last = ["data", "eval"];
                if (first.includes(a)) return -1;
                if (first.includes(b)) return 1;
                if (last.includes(a)) return 1;
                if (last.includes(b)) return -1;
                return 0;
            });
        for (const parameter of sortedParameterKeys) {
            if (parameters[parameter] != undefined) {
                suffix += suffix ? "&" : "?";
                suffix += `${parameter}=${encodeURIComponent(
                    parameters[parameter]
                )}`;
            }
        }
        // When the URI gets decoded, the %20 at the end gets somehow removed.
        // Adding a trailing & to prevent this.
        if (suffix.endsWith("%20")) suffix += "&";
        return prefix + suffix;
    }

    async copyURI(parameters: Parameters) {
        const uri = await this.generateURI(parameters);
        await copyText(uri);

        new Notice("Advanced URI copied to your clipboard");
    }

    getFileFromUID(uid: string): TFile | undefined {
        const files = this.app.vault.getMarkdownFiles();
        const idKey = this.settings.idField;
        for (const file of files) {
            const fieldValue = parseFrontMatterEntry(
                this.app.metadataCache.getFileCache(file)?.frontmatter,
                idKey
            );

            if (fieldValue instanceof Array) {
                if (fieldValue.contains(uid)) return file;
            } else {
                if (fieldValue == uid) return file;
            }
        }
    }

    getFileFromBlockID(blockId: string): TFile | undefined {
        const files = this.app.vault.getMarkdownFiles();

        for (const file of files) {
            const blockExists =
                this.app.metadataCache.getFileCache(file)?.blocks?.[blockId] !=
                undefined;
            if (blockExists) return file;
        }
    }
}
