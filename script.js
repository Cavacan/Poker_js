import { evaluateHand } from './module.js';  // 役判定モジュール
import { displayCards, displayResult } from './module2.js'; // 表示モジュール

// スートとランクを使ったデッキの作成
function createDeck() {
    const suits = ['hearts', 'diamonds', 'clubs', 'spades']; // スート
    const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']; // ランク
    const deck = [];

    suits.forEach(suit => {
        ranks.forEach(rank => {
            deck.push({ suit, rank }); // 各スートに各ランクのカードを追加
        });
    });
    return deck;
}

// デッキをシャッフルする
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
    const board = shuffledDeck.slice(0, 5);  // ボードカード
    const playerHand = shuffledDeck.slice(5, 7);  // プレイヤーの手札

    // 7枚のカード（ボード + 手札）a
    const combinedHand = [...board, ...playerHand];

    // 役の確認
    const { bestHand, handRank } = evaluateHand(combinedHand);

    // カードと役を表示
    displayCards(board, playerHand);
    displayResult(handRank, bestHand);
}

// 開始ボタンのイベントリスナーを設定
document.getElementById('start-btn').addEventListener('click', main);
