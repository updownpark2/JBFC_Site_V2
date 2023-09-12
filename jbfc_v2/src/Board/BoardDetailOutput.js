import { useLocation } from "react-router-dom";
import getBoardDetail from "./BoardDetailModel";
import { useState } from "react";
import { useEffect } from "react";
export default function BoardDetailOutput() {
  const boardId = useLocation().state;
  const [boardDetail, setBoardDetail] = useState([]);

  const setBoardDetailData = async (boardId) => {
    const boardDetail = await getBoardDetail(boardId);

    setBoardDetail(boardDetail.data);
  };

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
          <span>좋아요 싫어요</span>
          <br />
          <button type="button">👍</button>
          <button type="button">👎</button>
        </div>
      )}
    </div>
  );
}
