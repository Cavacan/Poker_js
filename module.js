const rankOrder = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

// 役を判定する関数
export function evaluateHand(cards) {
    const rankCount = {};  // ランクごとの枚数
    const suitCount = {};  // スートごとの枚数
    const rankValues = []; // ランクの数値
    const suits = [];

    // カードのランクとスートをカウント
    cards.forEach(card => {
        const rankIndex = rankOrder.indexOf(card.rank); // ランクのインデックス (0-12)
        rankValues.push(rankIndex);  // ランクの数値を格納
        suits.push(card.suit);       // スートを格納

        // ランクカウントの更新
        rankCount[card.rank] = (rankCount[card.rank] || 0) + 1;
        // スートカウントの更新
        suitCount[card.suit] = (suitCount[card.suit] || 0) + 1;
    });

    // 役を確認する
    const isFlush = checkFlush(suitCount);
    const isStraight = checkStraight(rankValues);
    const counts = Object.values(rankCount);

    let bestHand = [];
    let handRank = '';

    // 役の強さに応じて判定
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
        bestHand = findBestHighCards(cards, 5); // 強い順に5枚選ぶ
        handRank = 'ハイカード';
    }

    return { bestHand, handRank };
}

// フラッシュの確認
function checkFlush(suitCount) {
    return Object.values(suitCount).some(count => count >= 5);
}

// ストレートの確認
function checkStraight(rankValues) {
    const sortedRanks = [...new Set(rankValues)].sort((a, b) => a - b);
    for (let i = 0; i <= sortedRanks.length - 5; i++) {
        const straight = sortedRanks.slice(i, i + 5);
        if (straight[4] - straight[0] === 4) {
            return { high: straight[4] };
        }
    }
    // A-2-3-4-5 の特別なストレート
    if (sortedRanks.includes(12) && sortedRanks.slice(0, 4).toString() === '0,1,2,3') {
        return { high: 3 }; // A-2-3-4-5
    }
    return false;
}

// 残りのカードから強い順で不足分を補う関数
function fillRemainingCards(originalCards, usedCards, numberToFill) {
    // usedCards に含まれるカードを originalCards から削除
    const remainingCards = originalCards.filter(card => !usedCards.includes(card));

    // 残りのカードを強い順にソートする
    const sortedRemaining = remainingCards.sort((a, b) => {
        const rankA = rankOrder.indexOf(a.rank);
        const rankB = rankOrder.indexOf(b.rank);
        return rankB - rankA; // 強い順（ランクの降順）にソート
    });

    // 残りのカードから不足分を取得
    return sortedRemaining.slice(0, numberToFill);
}

// 特定の役に必要なカードを見つける関数 (フォーカードやスリーカードなど)
function findBestCards(cards, count) {
    const rankCount = {};
    cards.forEach(card => {
        rankCount[card.rank] = (rankCount[card.rank] || 0) + 1;
    });

    const bestRanks = Object.keys(rankCount)
        .filter(rank => rankCount[rank] === count)
        .sort((a, b) => rankOrder.indexOf(b) - rankOrder.indexOf(a)); // 強い順にソート

    return cards.filter(card => bestRanks.includes(card.rank));
}

// フルハウスの最強5枚を選ぶ関数
function findBestFullHouse(cards, rankCount) {
    const threeOfAKind = Object.keys(rankCount).find(rank => rankCount[rank] === 3);
    const pair = Object.keys(rankCount).find(rank => rankCount[rank] === 2);
    return cards.filter(card => card.rank === threeOfAKind || card.rank === pair);
}

// フラッシュの最強5枚を選ぶ関数
function findBestFlush(cards) {
    const suitCount = {};
    cards.forEach(card => {
        suitCount[card.suit] = (suitCount[card.suit] || 0) + 1;
    });
    const flushSuit = Object.keys(suitCount).find(suit => suitCount[suit] >= 5);
    return cards.filter(card => card.suit === flushSuit).slice(0, 5);
}

// ストレートの最強5枚を選ぶ関数
function findBestStraight(cards) {
    const rankValues = cards.map(card => rankOrder.indexOf(card.rank)).sort((a, b) => a - b);
    const straightCards = cards.filter(card => rankValues.includes(rankOrder.indexOf(card.rank)));
    return straightCards.slice(0, 5); // 5枚選ぶ
}

// ツーペアの最強5枚を選ぶ関数
function findBestTwoPair(cards, rankCount) {
    const pairs = Object.keys(rankCount).filter(rank => rankCount[rank] === 2).sort((a, b) => rankOrder.indexOf(b) - rankOrder.indexOf(a));
    return cards.filter(card => pairs.includes(card.rank)).slice(0, 5);
}

// ハイカードの最強5枚を選ぶ関数
function findBestHighCards(cards, numberToSelect) {
    // ランク順でソートして、強い順に numberToSelect 枚だけ返す
    const sortedCards = cards.sort((a, b) => rankOrder.indexOf(b.rank) - rankOrder.indexOf(a.rank));
    return sortedCards.slice(0, numberToSelect);
}
