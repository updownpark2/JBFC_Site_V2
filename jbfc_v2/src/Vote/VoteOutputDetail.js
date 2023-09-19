export default function VoteOutputDetail({
  inputDetailModalToggle,
  setIsVoting,
}) {
  const modalOnOff = (event) => {
    event.preventDefault();
    inputDetailModalToggle((current) => !current);
  };
  const retryVote = (event) => {
    event.preventDefault();
    setIsVoting(false);
  };

  return (
    <div>
      <h2>투표결과입니다</h2>
      <button onClick={modalOnOff}>❌</button>
      <button onClick={retryVote}>다시 투표하기</button>
    </div>
  );
}
