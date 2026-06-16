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
export function exportDeckToString(customDeck: DeckItem[]): string {
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
    return btoa(payloadString);
  } catch (error) {
    console.error("Failed to serialize deck schema safely:", error);
    return "";
  }
}