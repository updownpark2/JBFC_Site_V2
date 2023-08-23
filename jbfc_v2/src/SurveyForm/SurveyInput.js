// 로그인이 성공했는데 첫 방문일때!

// 즉 닉네임에 대한 정보가 DB에 없을때 이 컴포넌트를 rendering
export default function SurveyInput({ validateUserInput }) {
  // checkbox에 1개씩만 check하도록 하는 함수
  const checkOnlyOne = (element) => {
    const checkboxes = document.getElementsByName("position");

    checkboxes.forEach((cb) => {
      cb.checked = false;
    });
    element.target.checked = true;
  };
  // 등번호를 최대 99로 제한하는 함수
  const numberMaxLength = (e) => {
    if (e.target.max * 1 < e.target.value * 1) {
      e.target.value = 99;
    } else if (e.target.value * 1 < 0) {
      e.target.value = 1;
    }
  };

  return (
    <div>
      <form onSubmit={validateUserInput}>
        <input placeholder="닉네임을 입력해주세요" />
        <br />
        <input
          onClick={checkOnlyOne}
          type="checkbox"
          name="position"
          value="ST"
        />
        ST
        <input
          onClick={checkOnlyOne}
          type="checkbox"
          name="position"
          value="MF"
        />
        MF
        <input
          onClick={checkOnlyOne}
          type="checkbox"
          name="position"
          value="DF"
        />
        DF
        <input
          onClick={checkOnlyOne}
          type="checkbox"
          name="position"
          value="GK"
        />
        GK
        <input
          onClick={checkOnlyOne}
          type="checkbox"
          name="position"
          value="STAFF"
        />
        STAFF
        <br />
        <input
          placeholder="원하는 등번호"
          type="number"
          max="99"
          onInput={numberMaxLength}
        />
        <br />
        <button>제출</button>
      </form>
    </div>
  );
}
