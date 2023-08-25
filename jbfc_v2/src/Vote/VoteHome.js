import VoteInput from "./VoteInput";

export default function VoteHome() {
  // voteOption을 찾아서 해당 value를 arr에 저장
  const pushVoteOption = (event, voteOptionArr) => {
    for (let i = 2; i < event.target.length; i++) {
      if (event.target[i].className === "voteOption") {
        voteOptionArr.push(event.target[i].value);
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

  // input에서 vote Data를 받아옴
  const sendVoteData = (event) => {
    event.preventDefault();

    //여기서 이제 데이터 받아서 DB에 저장하고 outPut에뿌리면된다.
    const voteDate = event.target[0].value;
    const voteTitle = event.target[1].value;
    const voteOptionArr = [];
    const voteCheckBoxArr = [];
    pushVoteOption(event, voteOptionArr);
    pushVoteCheckBoxArr(event, voteCheckBoxArr);

    console.log(voteDate, voteTitle, voteOptionArr, voteCheckBoxArr);
  };
  return (
    <div>
      <h1>풋살 날짜 투표</h1>
      <VoteInput sendVoteData={sendVoteData} />
    </div>
  );
}
