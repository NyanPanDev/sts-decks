/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeckItem } from "./export";

/**
 * @param deckString - The raw compressed Base64 string
 * @param cardDatabase - card database
 * @param showUpgraded - is card upgraded?
 * @returns An array of cards
 */
export function importDeckFromString(
  deckString: string,
  cardDatabase: any[],
  showUpgraded: boolean
): DeckItem[] {
  if (!deckString || deckString.trim() === "") {
    return [];
  }

  try {
    const decodedPayload = atob(deckString.trim());
    
    const instructionPairs = decodedPayload.split(",");
    const importedDeckInstances: DeckItem[] = [];

    for (const pair of instructionPairs) {
      if (!pair.includes(":")) continue;
      
      const [cardId, countStr] = pair.split(":");
      const count = parseInt(countStr, 10);
      
      if (isNaN(count) || count <= 0) continue;

      const upgradeFlag = cardId.slice(-1);
      const cardIdWithoutUpgrade = cardId.slice(0, -1);

      const isUpgraded = upgradeFlag === "+";
      
      const templateCard = cardDatabase.find((c) => c.id === cardIdWithoutUpgrade);
      
      if (templateCard) {
        for (let i = 0; i < count; i++) {
          importedDeckInstances.push({
            ...templateCard,
            deckInstanceId: `${templateCard.id}-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
            isUpgradedInDeck: isUpgraded,
          });
        }
      } else {
        console.warn(`Card blueprint ID '${cardId}' was not recognized in master database.`);
      }
    }

    return importedDeckInstances;
  } catch (error) {
    console.error("Invalid deck string layout format received:", error);
    throw new Error("Unable to parse deck code. Please check that the copied string is correct.");
  }
}