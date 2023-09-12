import { useLocation } from "react-router-dom";
import { getBoardDetail, hateThisPush, likeThisPush } from "./BoardDetailModel";
import { useState } from "react";
import { useEffect } from "react";
export default function BoardDetailOutput() {
  const { boardId } = useLocation().state;
  const [boardDetail, setBoardDetail] = useState([]);
  const [likeThis, setLikeThis] = useState([]);
  const [hateThis, setHateThis] = useState([]);
  // state에 저장

  const setBoardDetailData = async (boardId) => {
    const boardDetail = await getBoardDetail(boardId);

    setBoardDetail(boardDetail.data);
    setLikeThis(boardDetail.data.likeThis.length);
    setHateThis(boardDetail.data.hateThis.length);
    //처음에 한번 불러오고
  }; // set한다 BoardData를

  //이거하면 다시 수정해야하는데

  useEffect(() => {
    const getAndsetBoardDetailApi = async () => {
      await setBoardDetailData(boardId);
    };
    getAndsetBoardDetailApi();
  }, []);

  return (
    <div>
      {boardDetail === [] ? (
        <h2>로딩중</h2>
      ) : (
        <div>
          <h2>{boardDetail.title}</h2>
          <p>{boardDetail.text}</p>
          <span>
            {boardDetail.month}월 {boardDetail.day}
          </span>
          <p>작성자: {boardDetail.userId}</p>
          <span>
            {likeThis}
            {hateThis}
          </span>
          <br />
          <button
            onClick={() => likeThisPush(boardId, boardDetail.userId)}
            type="button"
          >
            👍
          </button>
          <button
            onClick={() => hateThisPush(boardId, boardDetail.userId)}
            type="button"
          >
            👎
          </button>
        </div>
      )}
    </div>
  );
}
