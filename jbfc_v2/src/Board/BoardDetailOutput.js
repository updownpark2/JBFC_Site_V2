import { useLocation } from "react-router-dom";
import { getBoardDetail, hateThisPush, likeThisPush } from "./BoardDetailModel";
import { useState } from "react";
import { useEffect } from "react";
import RepleContoller from "../Reple/RepleController";
export default function BoardDetailOutput() {
  const { boardId } = useLocation().state;
  const [boardDetail, setBoardDetail] = useState([]);
  const [likeThis, setLikeThis] = useState([]);
  const [hateThis, setHateThis] = useState([]);
  // state에 저장

  const setBoardDetailData = async (boardId) => {
    const newBoardDetail = await getBoardDetail(boardId);
    setBoardDetail(newBoardDetail.data);
    setLikeThis(newBoardDetail.data.likeThis.length);
    setHateThis(newBoardDetail.data.hateThis.length);

    //처음에 한번 불러오고
  }; // set한다 BoardData를

  //이거하면 다시 수정해야하는데

  useEffect(() => {
    const getAndsetBoardDetailApi = async () => {
      await setBoardDetailData(boardId);
    };
    getAndsetBoardDetailApi();
  }, []);
  // 바로바로 좋아요가 표시되도록해여함

  const clickLike = async () => {
    await likeThisPush(boardId, boardDetail.userId);
    const newBoardDetail = await getBoardDetail(boardId);
    setLikeThis(newBoardDetail.data.likeThis.length);
    console.log(likeThis);
  };
  const clickHate = async () => {
    await hateThisPush(boardId, boardDetail.userId);
    const newBoardDetail = await getBoardDetail(boardId);
    setHateThis(newBoardDetail.data.hateThis.length);
  };

  return (
    <div className="bg-purple-100 min-h-screen p-4">
      {boardDetail.length === 0 ? (
        <h2 className="text-2xl text-purple-800">로딩중</h2>
      ) : (
        <div>
          <div className="bg-white p-4 mb-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-2">{boardDetail.title}</h2>
            <p>{boardDetail.text}</p>
            <span className="text-gray-600">
              {boardDetail.month}월 {boardDetail.day}일
            </span>
            <p className="text-gray-600">작성자: {boardDetail.userId}</p>
            <span>
              <span className="text-purple-600 mr-2">좋아용:{likeThis}</span>
              <span className="text-purple-600">싫어용:{hateThis}</span>
            </span>
            <br />
            <button
              onClick={async () => clickLike()}
              type="button"
              className="bg-purple-500 text-white py-1 px-3 rounded-md hover:bg-purple-700 transition duration-300 ease-in-out"
            >
              👍
            </button>
            <button
              onClick={async () => clickHate()}
              type="button"
              className="bg-purple-500 text-white py-1 px-3 rounded-md hover:bg-purple-700 ml-2 transition duration-300 ease-in-out"
            >
              👎
            </button>
          </div>
          <RepleContoller componentId={boardId} componentName="Board" />
        </div>
      )}
    </div>
  );
}
