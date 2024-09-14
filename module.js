// カードのランク順
const rankOrder = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

// カードの役を判定する関数
export function evaluateHand(cards) {
    const rankCount = {};  // ランクごとの枚数
    const suitCount = {};  // スートごとの枚数
    const rankValues = []; // ランクの数値
    const suits = [];

    // カードのランクとスートをカウント
    cards.forEach(card => {
        const rankIndex = Math.floor((card - 1) / 4); // ランクのインデックス (0-12)
        const suitIndex = (card - 1) % 4; // スートのインデックス (0-3)

        const rank = rankOrder[rankIndex];
        const suit = suitIndex;

        rankValues.push(rankIndex);  // ランクの数値
        suits.push(suit);            // スート

        rankCount[rank] = (rankCount[rank] || 0) + 1;
        suitCount[suit] = (suitCount[suit] || 0) + 1;
    });

    // 役を確認する
    const isFlush = checkFlush(suitCount);
    const isStraight = checkStraight(rankValues);
    const counts = Object.values(rankCount);

    let bestHand = [];
    let handRank = '';

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

    // 役で使われたカードを削除し、残りのカードから不足分を補う
    const remainingCards = fillRemainingCards(cards, bestHand, 5 - bestHand.length);

    return { bestHand: [...bestHand, ...remainingCards], handRank };
}

// 残りのカードから強い順で不足分を補う関数
function fillRemainingCards(originalCards, usedCards, numberToFill) {
    // usedCards に含まれるカードを originalCards から削除
    const remainingCards = originalCards.filter(card => !usedCards.includes(card));

    // 残りのカードを強い順にソートする
    const sortedRemaining = remainingCards.sort((a, b) => {
        const rankA = Math.floor((a - 1) / 4);
        const rankB = Math.floor((b - 1) / 4);
        return rankB - rankA; // 強い順（ランクの降順）にソート
    });

    // 残りのカードから不足分を取得
    return sortedRemaining.slice(0, numberToFill);
}

// ストレートを確認する関数
function checkStraight(rankValues) {
    const sortedRanks = [...new Set(rankValues)].sort((a, b) => a - b); // 重複を除いてソート
    for (let i = 0; i <= sortedRanks.length - 5; i++) {
        const straight = sortedRanks.slice(i, i + 5);
        if (straight[4] - straight[0] === 4) { // 連続するランク
            return { high: straight[4] };
        }
    }
    // A, 2, 3, 4, 5 の特別なストレートも確認
    if (sortedRanks.includes(12) && sortedRanks.slice(0, 4).toString() === '0,1,2,3') {
        return { high: 3 }; // A-2-3-4-5
    }
    return false;
}

// フラッシュを確認する関数
function checkFlush(suitCount) {
    return Object.values(suitCount).some(count => count >= 5);
}

// フォーカードやスリーカード、ペアなどで使う最強のカードを見つける関数
function findBestCards(cards, count) {
    const rankCount = {};
    cards.forEach(card => {
        const rankIndex = Math.floor((card - 1) / 4);
        rankCount[rankIndex] = (rankCount[rankIndex] || 0) + 1;
    });
    const bestRanks = Object.keys(rankCount)
        .filter(rank => rankCount[rank] === count)
        .map(Number)
        .sort((a, b) => b - a); // 強い順にソート
    return cards.filter(card => bestRanks.includes(Math.floor((card - 1) / 4)));
}

// フルハウス用の最強の5枚を見つける関数
function findBestFullHouse(cards, rankCount) {
    const threeOfAKind = Object.keys(rankCount).find(rank => rankCount[rank] === 3);
    const pair = Object.keys(rankCount).find(rank => rankCount[rank] === 2);
    return cards.filter(card => {
        const rankIndex = Math.floor((card - 1) / 4);
        return rankIndex == threeOfAKind || rankIndex == pair;
    });
}

// フラッシュの最強の5枚を見つける関数
function findBestFlush(cards) {
    const suitCount = {};
    cards.forEach(card => {
        const suitIndex = (card - 1) % 4;
        suitCount[suitIndex] = (suitCount[suitIndex] || 0) + 1;
    });
    const flushSuit = Object.keys(suitCount).find(suit => suitCount[suit] >= 5);
    return cards.filter(card => (card - 1) % 4 == flushSuit).slice(0, 5); // 5枚だけ返す
}

// ストレートの最強の5枚を見つける関数
function findBestStraight(cards) {
    const rankValues = cards.map(card => Math.floor((card - 1) / 4)).sort((a, b) => a - b);
    return cards.filter(card => rankValues.includes(Math.floor((card - 1) / 4))).slice(0, 5);
}

// ツーペア用の最強の5枚を見つける関数
function findBestTwoPair(cards, rankCount) {
    const pairs = Object.keys(rankCount).filter(rank => rankCount[rank] === 2).map(Number).sort((a, b) => b - a);
    return cards.filter(card => pairs.includes(Math.floor((card - 1) / 4))).slice(0, 5);
}
