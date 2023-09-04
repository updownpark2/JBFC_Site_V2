export function getMonthDay() {
  const date = new Date();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return [month, day];
}

export function sliceBoardData(boardData) {
  const slicedBoardData = boardData.slice(-9);
  return slicedBoardData;
}
