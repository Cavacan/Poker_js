// const hands = ["5", "15", "14", "9", "20", "44", "26"];

export function checkFlush(suits, aceCard) {
  // 各スートの枚数を確認し、5枚以上あればフィルタリング
  for (let i = 0; i < suits.length; i++) {
    if (suits[i].length >= 5) {  // スートに5枚以上のカードがあるか
      suits[i].sort((a, b) => b - a);

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
