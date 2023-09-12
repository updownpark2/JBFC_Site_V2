import axios from "axios";

export async function getBoardDetail(boardId) {
  let boardDetail = await axios.post(`http://localhost:8080/getBoardDetail`, {
    boardId: boardId,
  });
  return boardDetail;
}
// 이건 boardDetail 정보를 가져오는 함수

export async function likeThisPush(boardId, userId) {
  const boardDetail = await getBoardDetail(boardId);
  if (!boardDetail.data.likeThis.includes(userId)) {
    axios.post(`http://localhost:8080/pushLikeThis`, {
      boardId: boardId,
      userId: userId,
    });
  }
  //만약 포함되어있다면 이제 삭제
  else {
    axios.post(`http://localhost:8080/popLikeThis`, {
      boardId: boardId,
      userId: userId,
    });
  }
}

export async function hateThisPush(boardId, userId) {
  const boardDetail = await getBoardDetail(boardId);
  if (!boardDetail.data.hateThis.includes(userId)) {
    axios.post(`http://localhost:8080/pushHateThis`, {
      boardId: boardId,
      userId: userId,
    });
  } else {
    axios.post(`http://localhost:8080/popHateThis`, {
      boardId: boardId,
      userId: userId,
    });
  }
}

//이제 좋아요를 받아서 수정하는 작업
