// const hands = ["20", "1", "17", "36", "45", "9", "25"];

export function checkHighCard(hands) {
  const cardGroups = Array.from({ length: 13 }, () => []);
  let highCards = [];

  for (let i = 0; i < hands.length; i++) {
    const cardNum = Number(hands[i]);
    cardGroups[(cardNum - 1) % 13].push(hands[i]);
  }

  if(cardGroups[0].length > 0){
    highCards.push(cardGroups[0][0]);
  }

  // 12から0に向かって要素を走査
  for (let i = cardGroups.length - 1; i >= 0; i--) {
    if (highCards.length < 5 && cardGroups[i].length > 0) {
      highCards.push(cardGroups[i][0])
    }else if(highCards.length >= 5){
      return highCards.slice(0, 5);
    }
  }
  return [];
}
// console.log(checkHighCard(hands));
