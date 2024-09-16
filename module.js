import { preprocessHands } from "./preprocessHands.js";
import { checkRoyalFlush } from "./checkRoyalFlush.js";
import { checkStraight } from "./checkStraight.js";
import { checkFlush } from "./checkFlush.js";
import { checkQuads } from "./checkQuads.js";
import { checkFullHouse } from "./checkFullHouse.js";
import { checkThreeOfAKind } from "./checkThreeOfAKind.js";
import { checkTwoPairs } from "./checkTwoPairs.js";
import { checkPairs } from "./checkPairs.js";
import { checkHighCard } from "./checkHighCard.js";

// カードのランク順
const rankOrder = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const aces = ["1", "14", "27", "40"];

// カードの役を判定する関数
export function evaluateHand(hands) {
  const [cardGroups, suits] = preprocessHands(hands);

  console.log(cardGroups);
  const [isStraightFlush, royal] = checkRoyalFlush(hands, suits);
  if (isStraightFlush.length > 0 && royal){
    return { bestHand: isStraightFlush, handRank: 'ロイヤルフラッシュ' };
  }else if (isStraightFlush.length > 0){
    return { bestHand: isStraightFlush, handRank: 'ストレートフラッシュ' };
  }else{
    const [isStraight] = checkStraight(cardGroups);
    const isFlush = checkFlush(suits, aces);
    if (isFlush.length > 0 ){
      return { bestHand: isFlush , handRank: 'フラッシュ' };
    }else if (isStraight.length > 0){
      return { bestHand: isStraight , handRank: 'ストレート' };
    }else{
      const isQuads = checkQuads(cardGroups, aces);
      if (isQuads.length > 0){
        return { bestHand: isQuads , handRank: 'フォーオブアカインド' };
      }else{
        const isFullHouse = checkFullHouse(cardGroups);
        if (isFullHouse.length > 0){
          return { bestHand: isFullHouse, handRank: 'フルハウス' };
        }else {
          const isThreeOfAKind = checkThreeOfAKind(cardGroups);
          if(isThreeOfAKind.length > 0){
            return { bestHand: isThreeOfAKind, handRank: "スリーオブアカインド" };
          }else{
            const isTwoPairs = checkTwoPairs(cardGroups);
            if(isTwoPairs > 0){
              return { bestHand: isTwoPairs, handRank: "ツーペア" };
            }else{
              const isOnePair = checkPairs(cardGroups);
              if(isOnePair.length > 0){
                return { bestHand: isOnePair, handRank: "ワンペア" };
              }else{
                const isHighCard = checkHighCard(cardGroups);
                return { bestHand: isHighCard, handRank: "ハイカード" };
              }
            }
          }
        }
      }
    }
  }
}

