// const hands = ["20", "1", "17", "36", "45", "9", "25"];
// const hands = ["20", "1", "7", "36", "16", "45", "25"];

export function checkPairs(cardGroups) {
  let pairs = null;
  let lastCards = [];
  
  if(cardGroups[0].length === 2){
    pairs = cardGroups[0];
  }else if(cardGroups[0].length > 0){
    lastCards.push(cardGroups[0][0]);
  }

  // 12から0に向かって要素を走査
  for (let i = cardGroups.length - 1; i >= 0; i--) {
    if(!pairs && cardGroups[i].length === 2) {
      pairs = cardGroups[i];
    }else if(lastCards.length < 5 && cardGroups[i].length > 0){
      lastCards.push(cardGroups[i][0]);
    }

    if (pairs && lastCards.length >= 3){
      return [...pairs, ...lastCards.slice(0, 3)];
    }
  }
  return [];
}
// console.log(checkPairs(hands));
