// カードと役を表示するモジュール

// カードを表示する関数
export function displayCards(board, playerHand) {
  const boardElement = document.getElementById('board-cards');
  const handElement = document.getElementById('hand-cards');

  // カード番号を文字列で表示
  boardElement.textContent = `ボード: ${board.join(', ')}`;
  handElement.textContent = `手札: ${playerHand.join(', ')}`;
}

// 役と強いカードを表示する関数
export function displayResult(handRank, bestHand) {
  const resultElement = document.getElementById('hand-result-text');

  // 役と、その役を構成するカード番号を表示
  resultElement.textContent = `役: ${handRank}, カード: ${bestHand.join(', ')}`;
}
