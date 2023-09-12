import axios from "axios";

export default async function getBoardDetail(boardId) {
  let boardDetail = await axios.post(`http://localhost:8080/getBoardDetail`, {
    boardId: boardId,
  });
  return boardDetail;
}
