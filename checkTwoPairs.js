// const hands = ["20", "1", "17", "36", "45", "9", "51"];
// const hands = ["20", "1", "7", "36", "16", "45", "49"];

export function checkTwoPairs(cardGroups) {
  let firstPairs = null;
  let secondPairs = null;
  let lastCard = "";

  // 12から0に向かって要素を走査
  for (let i = cardGroups.length - 1; i >= 0; i--) {
    if (!firstPairs && cardGroups[i].length === 2) {
      firstPairs = cardGroups[i];
    }else if(!secondPairs && cardGroups[i].length === 2){
      secondPairs = cardGroups[i];
    }else if(lastCard === "" && cardGroups[i].length > 0){
      lastCard = cardGroups[i][0]
    }
    if (firstPairs !== null && secondPairs !== null && lastCard !== ""){
      return [...firstPairs, ...secondPairs, lastCard];
    }
  }
  return [];
}
// console.log(checkTwoPairs(hands));
