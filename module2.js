// カードを表示する関数
export function displayCards(board, playerHand) {
  const boardElement = document.getElementById('board-cards');
  const handElement = document.getElementById('hand-cards');

  // ボードカードの画像を表示
  boardElement.innerHTML = board.map(cardNumber => {
    const imgSrc = getCardImage(cardNumber);
    return `<img src="${imgSrc}" alt="Card ${cardNumber}" class="card-image">`;
  }).join(' ');

  // プレイヤー手札の画像を表示
  handElement.innerHTML = playerHand.map(cardNumber => {
    const imgSrc = getCardImage(cardNumber);
    return `<img src="${imgSrc}" alt="Card ${cardNumber}" class="card-imageF>`;
  }).join(' ');
}

// 役と構成カードを表示する関数
export function displayResult(handRank, bestHand) {
  const resultElement = document.getElementById('hand-result-text');

  // 役と構成カードの画像を表示
  const cardImages = bestHand.map(cardNumber => {
    const imgSrc = getCardImage(cardNumber);
    return `<img src="${imgSrc}" alt="Card ${cardNumber}" class="card-image">`;
  }).join(' ');

  resultElement.innerHTML = `<strong>役: ${handRank}</strong><br>${cardImages}`;
}

// カード番号から画像ファイル名を生成（01.png ～ 52.png）
function getCardImage(cardNumber) {
  return `images/${String(cardNumber).padStart(2, '0')}.png`;  // ゼロパディング対応
}
