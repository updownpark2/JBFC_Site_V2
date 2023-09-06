//여기서는 자세한 투표input을 생성해서 이를 DB에 저장함

export default function VoteInputDetail({
  voteDataDetail,
  inputDetailModalToggle,
}) {
  //여기서 받으면됨
  console.log(voteDataDetail);

  return (
    <div>
      Detail
      <button type="button" onClick={inputDetailModalToggle}>
        ❌
      </button>
    </div>
  );
}
