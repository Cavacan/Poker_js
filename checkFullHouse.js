// const hands = ["20", "1", "14", "37", "45", "9", "51"];
// const hands = ["20", "1", "7", "33", "37", "46", "50"];

export function checkFullHouse(hands) {
  const cardGroups = Array.from({ length: 13 }, () => []);
  let threeCard = null;
  let pairs = null;

  for (let i = 0; i < hands.length; i++) {
    const cardNum = Number(hands[i]);
    cardGroups[(cardNum - 1) % 13].push(hands[i]);
  }

  if(cardGroups[0].length >= 3){
    threeCard = cardGroups[0].slice(0,3);
  }else if (cardGroups[0].length === 2){
    pairsCard = cardGroups[0].slice(0,2);
  }

  // 12から0に向かって要素を走査
  for (let i = cardGroups.length - 1; i >= 0; i--) {
    if (threeCard === null && cardGroups[i].length >= 3) {
      threeCard = cardGroups[i].slice(0, 3);
    }else if (pairs === null && cardGroups[i].length === 2){
      pairs = cardGroups[i].slice(0,2);
    }
    if (threeCard !== null && pairs !== null ){
      return [...threeCard, ...pairs]
    }
  }
  return [];
}
// console.log(checkFullHouse(hands));

