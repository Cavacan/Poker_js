
// デッキ作成（52枚のカードを連番で作成）
export function createDeck() {
  return Array.from({ length: 52 }, (_, i) => i + 1);
}

// デッキをシャッフルする
export function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}
