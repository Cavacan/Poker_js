const preprocessModule = (function() {
  function preprocessHands(hands){
    const cardGroups = Array.from({ length: 13 }, () => []);
    const suits = Array.from({ length: 4 }, () => []);

    for (let i = 0; i < hands.length; i++) {
      const cardNum = Number(hands[i]);
      cardGroups[(cardNum - 1) % 13].push(hands[i]);
      suits[Math.floor((cardNum - 1) / 13)].push(hands[i]);
    }
    return [cardGroups, suits];
  }
  return{
    preprocessHands: preprocessHands
  }
})();

export const preprocessHands = preprocessModule.preprocessHands;