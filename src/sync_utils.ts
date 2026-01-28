import { App } from "obsidian";

type SyncInstance = {
    syncing: boolean;
    ready: boolean;
    syncStatus: string;
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

    while (sync.syncing === true) {
        console.log(
            "waiting for sync to complete, current status:",
            sync.syncStatus
        );
        await new Promise((resolve) => setTimeout(resolve, 1000));
    }
};
