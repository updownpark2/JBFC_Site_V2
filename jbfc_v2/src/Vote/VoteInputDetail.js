//여기서는 자세한 투표input을 생성해서 이를 DB에 저장함

export default function VoteInputDetail({
  voteDataDetail,
  inputDetailModalToggle,
  voteDetail,
  reVote,
}) {
  //여기서 받으면됨

  const checkOnlyOne = (element) => {
    const checkboxes = document.getElementsByName("text");

    checkboxes.forEach((cb) => {
      cb.checked = false;
    });
    element.target.checked = true;
  };
  const [voteMutiple, voteAnonymous] = voteDataDetail.voteCheckBoxArr;
  const voteTitle = voteDataDetail.voteTitle;
  const voteTextBoxArr = voteDataDetail.voteTextBoxArr;
  const voteDate = voteDataDetail.votedDate;

  //익명이면 ? 실시간 투표 안보이게 여기서 조절

  return voteDataDetail === null ? (
    <div>
      <h1>로딩중</h1>
    </div>
  ) : (
    <div>
      <h3>{voteTitle}</h3>
      <span>날짜: {voteDate}</span>
      <p>
        {voteMutiple
          ? "중복투표가 가능한 투표입니다."
          : "중복 투표가 불가능한 투표입니다."}
      </p>
      <form>
        {voteTextBoxArr.map((text, index) => (
          <li key={index}>
            {text}
            <input
              onClick={voteMutiple ? null : checkOnlyOne}
              type="checkbox"
              name="text"
            />
          </li>
        ))}
        <button onClick={voteDetail}>제출 😀</button>
      </form>
      <button type="button" onClick={inputDetailModalToggle}>
        ❌
      </button>
    </div>
  );
}
