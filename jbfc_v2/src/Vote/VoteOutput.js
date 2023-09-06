export default function VoteOutput({ voteData, goToDetailPage }) {
  //여기서 받아와서 paint

  //해당 투표로 가면 디테일하게 보여야하니까
  //작성자도 추가해야할듯

  //Link to 사용해서 보내줘야함
  // 누르면 해당 index의 자료를 보여줄 수 있게
  return (
    <div>
      {voteData === null ? (
        <h2>로딩중입니다.</h2>
      ) : (
        voteData.map((data, index) => (
          <div key={data._id}>
            <h3>{data.voteTitle}</h3>
            <p>{data.votedDate}</p>
            <button type="button" onClick={goToDetailPage} id={data._id}>
              참여
            </button>
          </div>
        ))
      )}
    </div>
  );
}
