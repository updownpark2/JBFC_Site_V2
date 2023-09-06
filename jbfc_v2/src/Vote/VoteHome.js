import axios from "axios";
import checkInputValid from "../CheckValid/checkInputValid";
import VoteInput from "./VoteInput";
import VoteOutput from "./VoteOutput";
import ReactModal from "react-modal";
import { useEffect, useState } from "react";
import VoteInputDetail from "./VoteInputDetail";

export default function VoteHome() {
  const [inputModalOpen, setInputModalOpen] = useState(false);
  console.log(inputModalOpen);
  const [inputDetailModalOpen, setInputDetailModalOpen] = useState(false);
  const [voteData, setVoteData] = useState(null);
  // voteOption을 찾아서 해당 value를 arr에 저장
  const [voteDataDetail, setVoteDataDetail] = useState(null);
  const getVoteData = async () => {
    const voteData = await axios.get(`http://localhost:8080/getVoteData`);
    setVoteData(voteData.data);
  };

  useEffect(() => {
    getVoteData();
  }, []);
  //최초 1회 voteData를 가져옴

  const pushVoteTextBoxArr = (event, voteTextBoxArr) => {
    for (let i = 2; i < event.target.length; i++) {
      if (event.target[i].className === "voteOption") {
        voteTextBoxArr.push(event.target[i].value);
      }
    }
  };
  // checkBox를 찾아서 해당 value를 arr에 저장
  const pushVoteCheckBoxArr = (event, voteCheckBox) => {
    for (let i = 2; i < event.target.length; i++) {
      if (event.target[i].className === "checkBox") {
        voteCheckBox.push(event.target[i].checked);
      }
    }
  };
  const checkVoteValid = (title, textArr) => {
    const checkinputvaild = new checkInputValid(null, null, null, null, null);
    try {
      checkinputvaild.checkVoteTitle(title);
      checkinputvaild.checkVoteText(textArr);
    } catch (error) {
      alert(error);
    }
  };

  const insertVoteDataInDB = async (
    voteDate,
    voteTitle,
    voteTextBoxArr,
    voteCheckBoxArr
  ) => {
    await axios.post(`http://localhost:8080/insertVoteData`, {
      voteDate: voteDate,
      voteTitle: voteTitle,
      voteTextBoxArr: voteTextBoxArr,
      voteCheckBoxArr: voteCheckBoxArr,
    });
    // 저장하고 나면? votedata를 새롭게 업데이트해서 가져옴
    getVoteData();
  };

  //modal을 키고 끌 수 있는 함수
  const inputModalToggle = () => {
    setInputModalOpen((current) => !current);
  };
  const inputDetailModalToggle = () => {
    setInputDetailModalOpen((current) => !current);
  };

  // input에서 vote Data를 받아옴
  const sendVoteData = async (event) => {
    event.preventDefault();

    //여기서 이제 데이터 받아서 DB에 저장하고 outPut에뿌리면된다.
    const voteDate = event.target[0].value;
    const voteTitle = event.target[1].value;
    const voteTextBoxArr = [];
    const voteCheckBoxArr = [];
    pushVoteTextBoxArr(event, voteTextBoxArr);
    pushVoteCheckBoxArr(event, voteCheckBoxArr);

    //타당성검사
    checkVoteValid(voteTitle, voteTextBoxArr);
    await insertVoteDataInDB(
      voteDate,
      voteTitle,
      voteTextBoxArr,
      voteCheckBoxArr
    );
    inputModalToggle();
    // 여기서 DB에 저장
  };

  // DB에서 voteData를 가져오는함수

  const getDetailVoteData = async (detailVoteDataId) => {
    const detailVoteData = await axios.post(
      `http://localhost:8080/getDetailVoteData`,
      { _id: detailVoteDataId }
    );
    return detailVoteData.data;
  };

  const goToDetailPage = async (e) => {
    //여기의 data를 가지고 다시 보내주자 input에게
    const detailVoteDataId = e.target.id;
    //id가져왔으니까 이걸로 다시 서버와 통신해서 가져와야함
    const detailVoteData = await getDetailVoteData(detailVoteDataId);
    setVoteDataDetail(detailVoteData);
    inputDetailModalToggle();

    //여기서 모달을 켬
  };

  return (
    <div>
      <h1>풋살 날짜 투표</h1>
      <VoteOutput voteData={voteData} goToDetailPage={goToDetailPage} />
      <button type="button" onClick={inputModalToggle}>
        투표 만들기
      </button>
      <ReactModal isOpen={inputModalOpen} ariaHideApp={false}>
        <VoteInput
          sendVoteData={sendVoteData}
          inputModalToggle={inputModalToggle}
        />
      </ReactModal>
      <ReactModal isOpen={inputDetailModalOpen} ariaHideApp={false}>
        <VoteInputDetail
          voteDataDetail={voteDataDetail}
          inputDetailModalToggle={inputDetailModalToggle}
        />
      </ReactModal>
    </div>
  );
}
