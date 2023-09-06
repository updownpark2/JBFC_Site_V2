import axios from "axios";
import checkInputValid from "../CheckValid/checkInputValid";
import VoteInput from "./VoteInput";

export default function VoteHome() {
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

  // input에서 vote Data를 받아옴
  const sendVoteData = (event) => {
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
    insertVoteDataInDB(voteDate, voteTitle, voteTextBoxArr, voteCheckBoxArr);
    // 여기서 DB에 저장
  };
  return (
    <div>
      <h1>풋살 날짜 투표</h1>
      <VoteInput sendVoteData={sendVoteData} />
    </div>
  );
}
