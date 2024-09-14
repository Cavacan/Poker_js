import { evaluateHand } from './module.js';
import { displayCards, displayResult } from './module2.js';

// デッキ作成（52枚のカードを連番にする）
function createDeck() {
    return Array.from({ length: 52 }, (_, i) => i + 1);
}

// カードをシャッフルする
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

// メイン処理
function main() {
    const deck = createDeck();
    const shuffledDeck = shuffleDeck(deck);

    // ボードに5枚、プレイヤーに2枚配る
    const board = shuffledDeck.slice(0, 5);  // 先頭の5枚がボード
    const playerHand = shuffledDeck.slice(5, 7);  // 次の2枚が手札

    // ボードと手札を合体させた7枚のカード
    const combinedHand = [...board, ...playerHand];

    // 役の確認
    const { bestHand, handRank } = evaluateHand(combinedHand);

    // カードと役を表示
    displayCards(board, playerHand);
    displayResult(handRank, bestHand);
}

// ボタンにイベントリスナーを設定
document.getElementById('start-btn').addEventListener('click', main);
