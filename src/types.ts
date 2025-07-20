import { PaneType, View, moment } from "obsidian";
import { CanvasNodeData } from "obsidian/canvas";

declare module "obsidian" {
    interface App {
        setting: {
            containerEl: HTMLElement;
            tabContentContainer: HTMLElement;
            openTabById(id: string): void;
            pluginTabs: Array<{
                id: string;
                name: string;
                instance?: {
                    description: string;
                    id: string;
                    name: string;
                };
            }>;
            activeTab: SettingTab;
            open(): void;
        };
        appId: string;
        commands: {
            executeCommandById(id: string): void;
            commands: {
                [key: string]: Command;
            };
        };
        plugins: {
            plugins: {
                [key: string]: { manifest: PluginManifest };
                "obsidian-hover-editor": {
                    spawnPopover(
                        initiatingEl?: HTMLElement,
                        onShowCallback?: () => unknown
                    ): WorkspaceLeaf;
                    manifest: PluginManifest;
                };
            };
            enablePluginAndSave(plugin: string): void;
            disablePluginAndSave(plugin: string): void;
            /** Returns the plugin instance if enabled and loaded */
            getPlugin(plugin: string): Plugin | null;
            manifests: Record<string, PluginManifest>;
            checkForUpdates(): Promise<void>;
            updates: {
                [key: string]: {};
            };
        };
        internalPlugins: {
            getEnabledPluginById(plugin: String): Plugin;
            getEnabledPluginById(plugin: "bookmarks"): {
                openBookmark(
                    bookmark: Bookmark,
                    viewmode: PaneType | boolean
                ): void;
                getBookmarks(): Bookmark[];
            } | null;
            getEnabledPluginById(plugin: "workspaces"): {
                activeWorkspace: string;
                workspaces: { [key: string]: any };
                saveWorkspace(workspace: string): void;
                loadWorkspace(workspace: string): void;
            } | null;
            getEnabledPluginById(plugin: "daily-notes"): {
                readonly options: {
                    folder: string;
                    format: string;
                    template: string;
                };
                getDailyNote(moment?: moment.Moment): Promise<TFile>;
            } | null;
            plugins: {
                [key: string]: {
                    disable(_: boolean): void;
                    enable(_: boolean): void;
                };
            };
        };
    }
    interface Bookmark {
        path: string;
        title: string;
        type: string;
    }

    interface View {
        file?: TFile;
    }
    interface FileView {
        currentMode: {
            showSearch(): void;
            search: {
                searchInputEl: HTMLInputElement;
            };
        };
    }
    interface WorkspaceLeaf {
        width: number;
    }
}

export interface FileModalData {
    source: string;
    display: string;
}

export interface EnterData {
    mode: string;
    data: string;
    display: string;
    func: Function;
}

export interface AdvancedURISettings {
    openFileOnWrite: boolean;
    openFileOnWriteInNewPane: boolean;
    openDailyInNewPane: boolean;
    openFileWithoutWriteInNewPane: boolean;
    idField: string;
    useUID: boolean;
    addFilepathWhenUsingUID: boolean;
    allowEval: boolean;
    includeVaultName: boolean;
    vaultParam: "id" | "name";
}

export interface Parameters {
    workspace?: string;
    filepath?: string;
    daily?: "true";
    data?: string;
    /**
     * Separator used between previous data and new data when performing
     * an append or prepend command.
     * @default "\n"
     */
    separator?: string;
    mode?: "overwrite" | "append" | "prepend" | "new";
    heading?: string;
    block?: string;
    commandname?: string;
    commandid?: string;
    search?: string;
    searchregex?: string;
    replace?: string;
    uid?: string;
    filename?: string;
    exists?: string;
    viewmode?: "source" | "preview" | "live";
    openmode?: OpenMode;
    settingid?: string;
    settingsection?: string;
    "x-success"?: string;
    "x-error"?: string;
    saveworkspace?: "true";
    updateplugins?: "true";
    line?: string;
    column?: string;
    /**
     * @deprecated Use "openMode" instead
     */
    newpane?: "true" | "false";
    clipboard?: string;
    "enable-plugin"?: string;
    "disable-plugin"?: string;
    frontmatterkey?: string;
    eval?: string;
    bookmark?: string;
    /**
     * A list of comma separated node ids
     */
    canvasnodes?: string;
    /**
     * x,y,zoom split by `,`
     * To keep current value a `-` can be used
     * To alter a value by a number use `++` or `-` before the number
     * @example
     * 0,0,1 to reset to default
     * --50,++25,- to decrease x by 50, increase y by 25 and keep current zoom
     */
    canvasviewport?: string;
    confirm?: string;
    offset?: string;
}

export type OpenMode = "silent" | "popover" | PaneType | "true" | "false";

export interface HookParameters {
    "x-success": string;
    "x-error": string;
}

export interface SearchModalData {
    source: string;
    display: string;
    isRegEx: boolean;
}

export interface CanvasView extends View {
    canvas: {
        selection: Set<CanvasNodeData>;
        zoomToSelection(): void;
        nodes: Map<string, CanvasNodeData>;
        select(node: CanvasNodeData): void;
        /*
         * Update `selection` in `func`
         */
        updateSelection(func: () => void): void;
        tx: number;
        ty: number;
        tZoom: number;
        markViewportChanged(): void;
    };
}
