export function checkStraight(hands) {
  // 13要素の配列を作成し、それぞれが空配列
  const cardGroups = Array.from({ length: 13 }, () => []);

  for (let i = 0; i < hands.length; i++) {
    const cardNum = Number(hands[i]);
    cardGroups[(cardNum - 1) % 13].push(hands[i]);
  }

  // 1次元目の最初の要素を抜き出して確認用配列を作成
  const firstElements = cardGroups.map(group => group.length > 0 ? group[0] : null);

  let consecutiveCount = 0;
  let startIndex = -1; // 連続が始まるインデックス

  // 12から0に向かって要素を走査
  for (let i = firstElements.length - 1; i >= 0; i--) {
    if (firstElements[i] !== null) {
      // 非空の要素があればカウントを増やす
      consecutiveCount++;

      // 連続が始まったインデックスを記録
      if (consecutiveCount === 1) {
        startIndex = i;
      }

      // 5つ連続した場合は確認を終了し、昇順のインデックスを表示
      if (consecutiveCount === 5) {
        const ascendingStartIndex = startIndex - 4; // 昇順での最初のインデックス
        // console.log(`5つ連続する非空要素がインデックス ${ascendingStartIndex} から ${startIndex} まで存在します。`);
        return firstElements.slice(ascendingStartIndex, startIndex + 1).map(String);
      }
    } else {
      // 空の要素があったらカウントをリセット
      consecutiveCount = 0;
      startIndex = -1;
    }
  }

  // ロイヤルストレート
  if (firstElements[0]!== null && firstElements.slice(9,13).every(value => value !== null)){
    return [firstElements.slice(9,13),firstElements[0]]
  }
  // console.log("5つ連続する非空要素は存在しません。");
  return []; // 5つ連続する要素が見つからない場合
}