/* eslint-disable @typescript-eslint/no-explicit-any */
export interface DeckItem {
  id: string;
  isUpgradedInDeck: boolean;
  [key: string]: any;
}

/**
 * @param customDeck - Array of cards currently in the user's custom deck
 * @returns A Base64 encoded string
 */
export function exportDeckToString(customDeck: DeckItem[], customRelics: any[]): string {
  let cards = "";
  if (!customDeck || customDeck.length === 0) {
    return "";
  }

  const cardCounts: Record<string, number> = {};
  customDeck.forEach((card) => {
    const upgradeSuffix = card.isUpgradedInDeck ? "+" : "-";
    const cardKey = `${card.id}${upgradeSuffix}`;
    cardCounts[cardKey] = (cardCounts[cardKey] || 0) + 1;
  });

  const payloadString = Object.entries(cardCounts)
    .map(([id, count]) => `${id}:${count}`)
    .join(",");

  try {
    cards = btoa(payloadString);
  } catch (error) {
    console.error("Failed to serialize deck schema safely:", error);
  }

  let relics = "";
  if (customRelics && customRelics.length > 0) {
      const relicsPayload = customRelics.map((relic) => relic.id).join(",");
      try {
      relics = btoa(relicsPayload);
    } catch (error) {
      console.error("Failed to serialize relics schema safely:", error);
    }
    };

    return `${cards}|${relics}`;
}