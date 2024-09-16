// const hands = ["20", "1", "17", "37", "45", "9", "51"];
// const hands = ["20", "1", "7", "33", "16", "45", "51"];

export function checkThreeOfAKind(cardGroups) {
  let threeOfAKind = null;
  let lastCards = [];

  if(cardGroups[0].length !== 3 && cardGroups[0].length > 0){
    lastCards = cardGroups[0];
  }

  // 12から0に向かって要素を走査
  for (let i = cardGroups.length - 1; i >= 0; i--) {
    if (cardGroups[i].length >= 3) {
      threeOfAKind = cardGroups[i];
    }else{
      if (lastCards.length < 2 && cardGroups[i].length > 0){
        lastCards.push(cardGroups[i][0]);
      }
    }
    if (threeOfAKind !== null && lastCards !== null){
      return [...threeOfAKind, ...lastCards];
    }
  }
  return [];
}
// console.log(checkThreeOfAKind(hands));

