import { PluginManifest } from "obsidian";

declare module 'obsidian' {
    interface App {
        setting: {
            containerEl: HTMLElement;
            openTabById(id: string): void;
            pluginTabs: Array<{
                id: string;
                name: string;
                plugin: {
                    [key: string]: PluginManifest;
                };
                instance?: {
                    description: string;
                    id: string;
                    name: string;
                };
            }>;
            activeTab: SettingTab;
            open(): void;
        };
        commands: {
            executeCommandById(id: string): void;
            commands: {
                [key: string]: Command;
            };
        };
        plugins: {
            plugins: {
                [key: string]: PluginManifest;
            };
            enablePlugin(plugin: string): void;
            disablePlugin(plugin: string): void;
        };
        internalPlugins: {
            plugins: {
                [key: string]: {
                    instance: {
                        description: string;
                        id: string;
                        name: string;
                    };
                    enabled: boolean;
                };
                workspaces: {
                    instance: {
                        description: string;
                        id: string;
                        name: string;
                        activeWorkspace: Workspace;
                        saveWorkspace(workspace: Workspace): void;
                        loadWorkspace(workspace: string): void;
                    };
                    enabled: boolean;
                };
            };
        };
    }
    interface View {
        file: TFile;
    }
}

export interface FileModalData {
    source: string;
    display: string;
}

export interface EnterData {
    mode: string;
    data: string,
    display: string,
    func: Function,
}

export interface AdvancedURISettings {
    openFileOnWrite: boolean;
    openFileOnWriteInNewPane: boolean;
    openDailyInNewPane: boolean;
    openFileWithoutWriteInNewPane: boolean;
    idField: string;
    useUID: boolean;
}

export interface Parameters {
    workspace?: string;
    filepath?: string;
    daily?: "true";
    data?: string;
    mode?: "overwrite" | "append" | "prepend" | "new";
    heading?: string;
    block?: string;
    commandname?: string,
    commandid?: string,
    search?: string,
    searchregex?: string;
    replace?: string;
    uid?: string;
    filename?: string;
    exists?: string;
    viewmode?: "source" | "preview" | "live";
    settingid?: string;
    "x-success"?: string;
    "x-error"?: string;
    saveworkspace?: "true";
    updateplugins?: "true";
    line?: number;
    newpane?: "true" | "false";
    clipboard?: "true";
    "enable-plugin"?: string;
    "disable-plugin"?: string;
    frontmatterkey?: string;
}

export interface HookParameters {
    "x-success": string;
    "x-error": string;

}

export interface SearchModalData {
    source: string;
    display: string;
    isRegEx: boolean;
}