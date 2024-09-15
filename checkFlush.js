// const hands = ["5", "15", "14", "9", "20", "44", "26"];

export function checkFlush(hands) {
  // 4つのスートごとにカードを分類
  const suits = Array.from({ length: 4 }, () => []);

  // 各カードをスートごとに分類
  for (let i = 0; i < hands.length; i++) {
    const num  = Number(hands[i]);
    const suit = Math.floor((num - 1) / 13);  // カードのスートを取得
    suits[suit].push(hands[i]);
  }

  console.log(suits)
  // 各スートの枚数を確認し、5枚以上あればフィルタリング
  for (let i = 0; i < suits.length; i++) {
    if (suits[i].length >= 5) {  // スートに5枚以上のカードがあるか
      suits[i].sort((a, b) => b - a);

      const aceCard = String(i * 13 + 1);
      console.log("Ace : " + aceCard );
      if (suits[i].includes(aceCard)){
        return [aceCard, ...suits[i].slice(0, 4)];
      }else{
        return suits[i].slice(0, 5);
      }
    }
  }
  return [];  // 5枚以上のカードがない場合は空配列を返す
}

// console.log(checkFlush(hands));
