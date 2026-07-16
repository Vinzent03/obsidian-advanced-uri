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

    let notice: Notice | null = null;
    let tryCount = 0;
    while (sync.ready === false) {
        tryCount++;
        // Wait for up to 10 seconds for sync to be ready
        if (tryCount > 40) {
            console.log(
                "sync instance not ready after 10 seconds, not waiting"
            );
            notice?.hide();
            return;
        }
        if (tryCount > 6 && !notice) {
            notice = new Notice("Adv. URI: Waiting for sync to complete...", 0);
        }
        await new Promise((resolve) => setTimeout(resolve, 250));
    }

    while (sync.syncing === true && sync.syncStatus !== "Indexing...") {
        tryCount++;
        // Wait for up to 60 seconds for syncing to complete
        if (tryCount > 240) {
            console.log(
                "sync instance still syncing after 60 seconds, not waiting"
            );

            notice?.hide();
            return;
        }
        if (tryCount > 6 && !notice) {
            notice = new Notice("Adv. URI: Waiting for sync to complete...", 0);
        }

        await new Promise((resolve) => setTimeout(resolve, 250));
    }

    notice?.hide();
};
