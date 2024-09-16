//const hands = ["7", "24", "30", "38", "48", "39", "34"];  // None
// const hands = ["40", "37", "30", "38", "36", "39", "35"];  // straightflush
// const hands = ["27", "24", "30", "38", "36", "39", "34"];  // flush
// const hands = ["27", "37", "30", "38", "36", "39", "34"]; // royal flush

export function checkRoyalFlush(hands, suits) {
  let maxSuitsNum = null;
  for (let i = 0; i < suits.length; i++) {
    if (suits[i].length >= 5) {
      maxSuitsNum = i;
    }
  }

  const theAce = maxSuitsNum * 13 + 1;
  const royals = [
    theAce,      // Ace
    theAce + 9,  // 10
    theAce + 10, // J
    theAce + 11, // Q
    theAce + 12  // K
  ];

  let counter = hands.filter(card => royals.includes(Number(card))).length;

  if (counter === 5) {
    return [royals, true];
  }

  // ストレートフラッシュの確認ロジック
  const allCards = Array.from({ length: 13 }, (_, i) => maxSuitsNum * 13 + (i + 1));
  for (let i = 0; i <= 8; i++) {
    const straight = allCards.slice(i, i + 5);
    const straightCount = hands.filter(card => straight.includes(Number(card))).length;
    if (straightCount === 5) {
      return [straight, false];
    }
  }

  // ロイヤルフラッシュとストレートフラッシュが成立しない場合
  return [[], false];
}

// checkRoyalFlush(hands);
