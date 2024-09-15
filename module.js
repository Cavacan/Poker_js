import { checkStraight } from "./checkStraight";
import { checkFlush } from "./checkFlush";
import { checkQuads } from "./checkQuads";
import { checkFullHouse } from "./checkFullHouse";
import { checkThreeOfAKind } from "./checkThreeOfAKind";
import { checkTwopair } from "./checkTwoPairs";
import { checkPairs } from "./checkPairs";
import { checkHighCard } from "./checkHighCard";


// カードのランク順
const rankOrder = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const aces = ["1", "14", "27", "40"];
const [cardGroups, suits] = preprocessHands(hands);

// カードの役を判定する関数
export function evaluateHand(hands) {
    const isFlush = checkFlush(hands, suits);

    const isStraight = checkStraight(hands, cardGroups);

    // 役の強さに応じて判定を行う
    if (isFlush && isStraight) {
        bestHand = findBestStraight(cards);
        handRank = isStraight.high === 12 ? 'ロイヤルフラッシュ' : 'ストレートフラッシュ';
    } else if (counts.includes(4)) {
        bestHand = findBestCards(cards, 4);
        handRank = 'フォーカード';
    } else if (counts.includes(3) && counts.includes(2)) {
        bestHand = findBestFullHouse(cards, rankCount);
        handRank = 'フルハウス';
    } else if (isFlush) {
        bestHand = findBestFlush(cards);
        handRank = 'フラッシュ';
    } else if (isStraight) {
        bestHand = findBestStraight(cards);
        handRank = 'ストレート';
    } else if (counts.includes(3)) {
        bestHand = findBestCards(cards, 3);
        handRank = 'スリーカード';
    } else if (counts.filter(count => count === 2).length === 2) {
        bestHand = findBestTwoPair(cards, rankCount);
        handRank = 'ツーペア';
    } else if (counts.includes(2)) {
        bestHand = findBestCards(cards, 2);
        handRank = 'ワンペア';
    } else {
        bestHand = findBestCards(cards, 1);
        handRank = 'ハイカード';
    }

    return { bestHand: [...bestHand, ...remainingCards], handRank };
}

