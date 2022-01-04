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
