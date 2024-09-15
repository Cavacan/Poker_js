import { evaluateHand } from './module.js';  // 役判定モジュール
import { displayCards, displayResult } from './module2.js'; // 画像表示モジュール

// デッキ作成（52枚のカードを連番で作成）
function createDeck() {
    return Array.from({ length: 52 }, (_, i) => i + 1);
}

// デッキをシャッフルする
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

// カード番号から画像ファイル名を生成（01.png ～ 52.png）
function getCardImage(cardNumber) {
    return `images/${String(cardNumber).padStart(2, '0')}.png`;  // ゼロパディング対応
}

// メイン処理
function main() {
    const deck = createDeck();
    const shuffledDeck = shuffleDeck(deck);

    // ボードに5枚、プレイヤーに2枚配る
    const board = shuffledDeck.slice(0, 5);  // ボードカード
    const playerHand = shuffledDeck.slice(5, 7);  // プレイヤーの手札

    // 7枚のカード（ボード + 手札）
    const combinedHand = [...board, ...playerHand];
    console.log(combinedHand);

    // 役の確認
    const { bestHand, handRank } = evaluateHand(combinedHand);

    // カードと役を表示
    displayCards(board, playerHand);
    displayResult(handRank, bestHand);
}

// 開始ボタンのイベントリスナーを設定
document.getElementById('start-btn').addEventListener('click', main);
