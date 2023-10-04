import axios from "axios";
import BoardInput from "./BoardInput";
import { getMonthDay, sliceBoardData } from "./BoardModel";
import { useEffect, useState } from "react";
import BoardOutput from "./BoardOutput";
import { useRecoilValue } from "recoil";
import { userIdState } from "../atoms";

export default function BoardHome() {
  const [boardData, setBoardData] = useState([]);
  const userId = useRecoilValue(userIdState);
  //여기서 초반에 Board 데이터를 가져와야함
  //이건 최초에 1회만 불러오기? => useEffect사용해서

  //insert하면 또 불러올 수 있도록
  const getBoardDataApi = async () => {
    //collection에 있는 거 다 가져오고싶으면?
    let boardData = (await axios.get(`http://localhost:8080/getBoardData`))
      .data;

    //9개까지만 자름

    setBoardData(sliceBoardData(boardData));
  };
  //함수명 변경필요
  //이제 이거를 useState로 저장해서 rerendering이 일어나게함

  useEffect(() => {
    const getAndSetBoardApi = async () => {
      await getBoardDataApi();
    };
    getAndSetBoardApi();
  }, []);

  //최초 1회 boardData가져옴

  const insertBoardDataApi = async (event) => {
    const title = event.target[0].value;
    const text = event.target[1].value;
    const [month, day] = getMonthDay();

    //나중에 변경사항
    await axios.post(`http://localhost:8080/insertBoard`, {
      title: title,
      text: text,
      month: month,
      day: day,
      userId: userId,
    });
  };

  const initInput = (event) => {
    event.target[0].value = ``;
    event.target[1].value = ``;
  };

  const submitPost = async (event) => {
    event.preventDefault();
    await insertBoardDataApi(event);
    await getBoardDataApi();
    initInput(event);
  };

  return (
    <div className="bg-purple-300 min-h-screen p-4">
      <div className="text-center mb-4">
        <h1 className="text-3xl font-semibold text-purple-800">게시판</h1>
      </div>
      <BoardInput submitPost={submitPost} />
      <BoardOutput boardData={boardData} />
    </div>
  );
}
