/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeckItem } from "./export";

interface UnpackedDeck {
  cards: DeckItem[];
  relics: any[];
}

/**
 * @param deckString - The raw compressed Base64 string
 * @param cardDatabase - card database
 * @param showUpgraded - is card upgraded?
 * @returns An array of cards
 */
export function importDeckFromString(
  deckString: string,
  cardDatabase: any[],
  relicDatabase: any[]
): UnpackedDeck {
  const result: UnpackedDeck = { cards: [], relics: [] };

  if (!deckString || !deckString.trim().includes("|")) {
    if (deckString && !deckString.includes(",")) return decodeCards(deckString, cardDatabase);
    return result;
  }

  const [cardsSegment, relicsSegment] = deckString.trim().split("|");

  if (cardsSegment) {
    result.cards = decodeCards(cardsSegment, cardDatabase).cards;
  }

  if (relicsSegment) {
    try {
      const decodedRelics = atob(relicsSegment);
      const relicIds = decodedRelics.split(",");

      for (const id of relicIds) {
        if (!id) continue;
        const matchedRelic = relicDatabase.find((r) => r.id === id);
        if (matchedRelic) {
          result.relics.push(matchedRelic);
        }
      }
    } catch (e) {
      console.error("Corrupt relic code compilation sequence:", e);
    }
  }

  return result;
}

function decodeCards(segment: string, cardDatabase: any[]): UnpackedDeck {
  const importedCards: DeckItem[] = [];
  try {
    const decodedPayload = atob(segment);
    const instructionPairs = decodedPayload.split(",");

    for (const pair of instructionPairs) {
      if (!pair.includes(":")) continue;
      const [keyWithUpgrade, countStr] = pair.split(":");
      const count = parseInt(countStr, 10);
      if (isNaN(count) || count <= 0) continue;

      const upgradeFlag = keyWithUpgrade.slice(-1);
      const cardId = keyWithUpgrade.slice(0, -1);
      const isCardUpgraded = upgradeFlag === "+";

      const templateCard = cardDatabase.find((c) => c.id === cardId);
      if (templateCard) {
        for (let i = 0; i < count; i++) {
          importedCards.push({
            ...templateCard,
            deckInstanceId: `${templateCard.id}-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
            isUpgradedInDeck: isCardUpgraded,
          });
        }
      }
    }
  } catch (e) {
    console.error("Failed parsing card segment block:", e);
  }
  return { cards: importedCards, relics: [] };
}