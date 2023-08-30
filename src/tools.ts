import { CachedMetadata, Notice, parseFrontMatterEntry, TFile } from "obsidian";
import { v4 as uuidv4 } from "uuid";
import AdvancedURI from "./main";
import { AdvancedURISettings, Parameters } from "./types";
import { copyText } from "./utils";
/**
 * These methods depend on the plugins settings in contrast to the utils.ts file, which's functions are independent of the plugins settings.
 */
export default class Tools {
    public get settings(): AdvancedURISettings {
        return this.plugin.settings;
    }

    public get app() {
        return this.plugin.app;
    }

    constructor(private readonly plugin: AdvancedURI) {}

    async writeUIDToFile(file: TFile, uid: string): Promise<string> {
        const frontmatter = app.metadataCache.getFileCache(file)?.frontmatter;
        const fileContent: string = await app.vault.read(file);
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
        await app.vault.modify(file, newFileContent);
        return uid;
    }

    async getUIDFromFile(file: TFile): Promise<string> {
        //await parsing of frontmatter
        const cache =
            app.metadataCache.getFileCache(file) ??
            (await new Promise<CachedMetadata>((resolve) => {
                const ref = app.metadataCache.on("changed", (metaFile) => {
                    if (metaFile.path == file.path) {
                        const cache = app.metadataCache.getFileCache(file);
                        app.metadataCache.offref(ref);
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

    async generateURI(parameters: Parameters, doubleEncode: boolean) {
        const prefix = `obsidian://advanced-uri?vault=${encodeURIComponent(
            app.vault.getName()
        )}`;
        let suffix = "";
        const file = app.vault.getAbstractFileByPath(parameters.filepath);

        if (
            this.settings.useUID &&
            file instanceof TFile &&
            file.extension == "md"
        ) {
            if (!this.settings.addFilepathWhenUsingUID)
                parameters.filepath = undefined;
            parameters.uid = await this.getUIDFromFile(file);
        }
        for (const parameter in parameters) {
            if ((parameters as any)[parameter] != undefined) {
                suffix =
                    suffix +
                    `&${parameter}=${encodeURIComponent(
                        (parameters as any)[parameter]
                    )}`;
            }
        }
        if (doubleEncode) {
            return prefix + encodeURI(suffix);
        } else {
            return prefix + suffix;
        }
    }

    async copyURI(parameters: Parameters) {
        const uri = await this.generateURI(parameters, true);
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
