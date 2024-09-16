import { evaluateHand } from './module.js';  // 役判定モジュール
import { displayCards, displayResult } from './module2.js'; // 画像表示モジュール
import { createDeck, shuffleDeck } from './deckModule.js';

let deck = shuffleDeck(createDeck());

function dealCard(count) {
  return deck.splice(0, count);
}

// メイン処理
function main() {
  // ボードにカードを配る前にデッキの残数をチェックし、足りなければ再作成・シャッフル
  if (deck.length < 20) {
    console.warn("Not enough cards to deal to the board. Reshuffling...");
    deck = shuffleDeck(createDeck());  // デッキの再作成とシャッフル
  }

  // ボードに5枚、プレイヤーに2枚配る
  
  const board = dealCard(5);  // ボードカード
  // const board = [13, 35, 37, 20, 9];  // ボードカード
  const playerHand = dealCard(2);  // プレイヤーの手札
  // const playerHand = [45, 11];  // プレイヤーの手札

  // 7枚のカード（ボード + 手札）
  const combinedHand = [...board, ...playerHand];

  // 役の確認
  const { bestHand, handRank } = evaluateHand(combinedHand);

  // カードと役を表示
  displayCards(board, playerHand);
  displayResult(handRank, bestHand);
}

// 開始ボタンのイベントリスナーを設定
document.getElementById('start-btn').addEventListener('click', main);
