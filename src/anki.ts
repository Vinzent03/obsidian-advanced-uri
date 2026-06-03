import { requestUrl } from "obsidian";

async function invoke(action: string, params: any = {}): Promise<any> {
    try {
        const response = await requestUrl({
            url: "http://127.0.0.1:8765",
            method: "POST",
            body: JSON.stringify({ action, version: 6, params }),
            contentType: "application/json",
        });

        const data = response.json;
        if (data.error) {
            throw new Error(data.error);
        }
        return data.result;
    } catch (e) {
        if (e.message && e.message.includes("net::ERR_CONNECTION_REFUSED")) {
            throw new Error("Anki is not open or AnkiConnect is not installed.");
        }
        throw e;
    }
}

export async function addUriToCurrentCard(uri: string, fieldName: string, action: "append" | "replace"): Promise<void> {
    // 1. Get current card
    let currentCard;
    try {
        currentCard = await invoke("guiCurrentCard");
    } catch (e) {
        throw new Error("Failed to connect to Anki: " + e.message);
    }

    if (!currentCard || !currentCard.cardId) {
        throw new Error("You are not currently studying any card in Anki.");
    }

    const fields = currentCard.fields;
    if (!fields || !(fieldName in fields)) {
        throw new Error(`The field "${fieldName}" does not exist in the current Anki card.`);
    }

    // 2. Get note ID from card ID
    const cardsInfo = await invoke("cardsInfo", { cards: [currentCard.cardId] });
    if (!cardsInfo || cardsInfo.length === 0) {
        throw new Error("Could not find card information for the current card.");
    }

    const noteId = cardsInfo[0].note;

    let newValue = uri;

    if (action === "append") {
        const currentValue = fields[fieldName].value;
        if (currentValue) {
            newValue = `${currentValue}<br>${newValue}`;
        }
    }

    // 3. Update the note field
    await invoke("updateNoteFields", {
        note: {
            id: noteId,
            fields: {
                [fieldName]: newValue
            }
        }
    });
}
