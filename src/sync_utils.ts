import { App, Notice } from "obsidian";

type SyncInstance = {
    syncing: boolean;
    ready: boolean;
    syncStatus: string;
    plugin: { enabled: boolean };
};

const getSyncInstance = (app: App): SyncInstance => {
    return (app.internalPlugins?.plugins?.sync as any)?.instance;
};

export const awaitSyncCompletion = async (app: App): Promise<void> => {
    let sync = getSyncInstance(app);
    if (!sync) {
        console.log("sync instance not found, not waiting");
        return;
    }

    if (sync?.plugin?.enabled !== true) {
        console.log("sync plugin is disabled, not waiting");
        return;
    }

    if (!("syncing" in sync) || !("ready" in sync)) {
        console.log(
            "sync instance does not have expected properties, not waiting"
        );
        return;
    }

    while (sync.ready === false) {
        console.log(
            "waiting for sync to be ready, current status:",
            sync.syncStatus
        );
        await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    let notice;
    while (sync.syncing === true && sync.syncStatus !== 'Indexing...') {
        console.log(
            "waiting for sync to complete, current status:",
            sync.syncStatus
        );
        if (!notice) {
            notice = new Notice("Waiting for sync to complete...");
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    if (notice) {
        notice.hide();
    }
};
