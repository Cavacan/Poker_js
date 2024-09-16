//const hands = ["20", "1", "14", "37", "45", "9", "51"];
// const hands = ["20", "1", "7", "33", "37", "46", "51"];

export function checkQuads(cardGroups, aceCard) {
  let quads = null;
  let lastCard = "";

  if(cardGroups[0].length !== 4 && cardGroups[0].length > 0){
    lastCard = cardGroups[0].find(card => aceCard.includes(card));
  }

  // 12から0に向かって要素を走査
  for (let i = cardGroups.length - 1; i >= 0; i--) {
    if (cardGroups[i].length === 4) {
      quads = cardGroups[i];
    }else{
      if (!lastCard && cardGroups[i].length > 0){
        lastCard = cardGroups[i][0];
      }
    }
    if (quads !== null && lastCard !== "" ){
      return [...quads, lastCard];
    }
  }
  return [];
}
// console.log(checkQuads(hands));

