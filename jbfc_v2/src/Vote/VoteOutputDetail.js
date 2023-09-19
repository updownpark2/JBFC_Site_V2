import axios from "axios";
import { useRecoilValue } from "recoil";
import { userIdState } from "../atoms";
import { useEffect, useState } from "react";

export default function VoteOutputDetail({
  inputDetailModalToggle,
  setIsVoting,
  detailVoteId,
  voteDataDetail,
}) {
  const userId = useRecoilValue(userIdState);
  const [voteRecord, setVoteRecord] = useState([]);
  const [isAnonymous, setIsAnonymous] = useState(false);

  const modalOnOff = (event) => {
    event.preventDefault();
    inputDetailModalToggle((current) => !current);
  }; // 모달을 끄고 키는 함수

  const cancelVote = () => {
    axios.post(`http://localhost:8080/cancelVote`, {
      detailVoteId: detailVoteId,
      userId: userId,
    });
  }; // 내가한 투표를 수정하는 함수

  const retryVote = async (event) => {
    event.preventDefault();
    setIsVoting(false);
    cancelVote();
    // 투표를 다시 할 수 있도록 세팅해주는 함수
    await getVoteRecord();
  };

  const getVoteRecord = async () => {
    const newVoteRecord = await axios.post(
      `http://localhost:8080/getVoteRecord`,
      {
        _id: detailVoteId,
      }
    );
    setVoteRecord(newVoteRecord.data.checkedData);
    setIsAnonymous(newVoteRecord.data.isAnonymous);
  };

  useEffect(() => {
    getVoteRecord();
  }, []);

  // 여기서 새로운 투표내용을 가져와서 뿌려줘야함

  // 이제 투표 한 사람 show

  return (
    <div>
      <h2>투표결과입니다</h2>
      <h3>{voteDataDetail.voteTitle}</h3>
      <h4>{voteDataDetail.votedDate}</h4>
      {voteRecord.map((item, index) => (
        <div key={index}>
          <span>{voteDataDetail.voteTextBoxArr[index]}</span>{" "}
          <progress value={item.length} max="20"></progress>
          <span>{item.length}</span>
        </div>
      ))}

      <button onClick={modalOnOff}>❌</button>
      <button onClick={retryVote}>다시 투표하기</button>
    </div>
  );
}
