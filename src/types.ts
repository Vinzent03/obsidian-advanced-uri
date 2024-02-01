import { PaneType } from "obsidian";

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
            getPlugin(plugin: string): Plugin | null;
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
                activeWorkspace: Workspace;
                saveWorkspace(workspace: Workspace): void;
                loadWorkspace(workspace: string): void;
            } | null;
            plugins: {
                [key: string]: {
                    disable(_:boolean): void;
                    enable(_:boolean): void;
                }
            }
        };
    }
    interface Bookmark {
        path: string;
        title: string;
        type: string;
    }

    interface View {
        file: TFile;
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
    line?: number;
    /**
     * @deprecated Use "openMode" instead
     */
    newpane?: "true" | "false";
    clipboard?: "true";
    "enable-plugin"?: string;
    "disable-plugin"?: string;
    frontmatterkey?: string;
    eval?: string;
    bookmark?: string;
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
