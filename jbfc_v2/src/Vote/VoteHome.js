import axios from "axios";
import checkInputValid from "../CheckValid/checkInputValid";
import VoteInput from "./VoteInput";
import VoteOutput from "./VoteOutput";
import ReactModal from "react-modal";
import { useState } from "react";

export default function VoteHome() {
  const [modalOpen, setModalOpen] = useState(false);

  // voteOption을 찾아서 해당 value를 arr에 저장
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
  };

  //modal을 키고 끌 수 있는 함수
  const modalToggle = () => {
    setModalOpen((current) => !current);
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
    modalToggle();
    // 여기서 DB에 저장
  };

  return (
    <div>
      <h1>풋살 날짜 투표</h1>
      <VoteOutput />
      <button type="button" onClick={modalToggle}>
        투표 만들기
      </button>
      <ReactModal isOpen={modalOpen} ariaHideApp={false}>
        <VoteInput sendVoteData={sendVoteData} modalToggle={modalToggle} />
      </ReactModal>
    </div>
  );
}
