export function checkStraight(cardGroups) {
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
        if (firstElements[0] !== null && firstElements.slice(9,13).every(value => value !== null)){
          return [[firstElements.slice(9,13), firstElements[0]], 10 ]
        }      
        const ascendingStartIndex = startIndex - 4; // 昇順での最初のインデックス
        return [firstElements.slice(ascendingStartIndex, startIndex + 1).map(String), ascendingStartIndex];
      }
    } else {
      // 空の要素があったらカウントをリセット
      consecutiveCount = 0;
      startIndex = -1;
    }
  }

  // ロイヤルストレート
  return [[], -1]; // 5つ連続する要素が見つからない場合
}