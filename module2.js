// カードを表示する関数
export function displayCards(board, playerHand) {
  const boardElement = document.getElementById('board-cards');
  const handElement = document.getElementById('hand-cards');

  // カードをスートとランクで表示
  boardElement.textContent = `ボード: ${board.map(card => card.suit + ' ' + card.rank).join(', ')}`;
  handElement.textContent = `手札: ${playerHand.map(card => card.suit + ' ' + card.rank).join(', ')}`;
}

// 役と構成カードを表示する関数
export function displayResult(handRank, bestHand) {
  const resultElement = document.getElementById('hand-result-text');

  // 役と、その役を構成するカードを表示
  resultElement.textContent = `役: ${handRank}, カード: ${bestHand.map(card => card.suit + ' ' + card.rank).join(', ')}`;
}
