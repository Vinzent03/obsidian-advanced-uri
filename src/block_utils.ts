import { Editor, EditorPosition, MarkdownView, SectionCache, TFile } from "obsidian";

export abstract class BlockUtils {
    private static getBlock(editor: Editor, file: TFile): SectionCache | undefined {
        const cursor = editor.getCursor("to");
        const fileCache = app.metadataCache.getFileCache(file);

        const currentBlock =
            fileCache?.sections?.find((section) =>
                section.position.start.line <= cursor.line &&
                section.position.end.line >= cursor.line
            );
        return currentBlock;
    }

    private static getIdOfBlock(
        editor: Editor,
        block: SectionCache,
    ): string {
        const blockId = block.id;

        if (blockId) {
            return blockId;
        }

        // Add a block id
        const sectionEnd = block.position.end;
        const end: EditorPosition = {
            ch: sectionEnd.col,
            line: sectionEnd.line,
        };

        const newId = Math.random().toString(36).substring(2, 8);
        const spacer = BlockUtils.shouldInsertAfter(block) ? "\n\n" : " ";

        editor.replaceRange(`${spacer}^${newId}`, end);
        return newId;
    }

    private static shouldInsertAfter(block: SectionCache): boolean {
        if (block.type) {
            return [
                "blockquote",
                "code",
                "table",
                "heading",
                "comment",
                "footnoteDefinition",
            ].includes(block.type);
        }
    }

    public static getBlockId(): string | undefined {
        const view = app.workspace.getActiveViewOfType(MarkdownView);
        if (view) {
            const editor = view.editor;
            const file = view.file;
            const block = this.getBlock(editor, file);
            if (block)
                return this.getIdOfBlock(editor, block);
        }
    }

}