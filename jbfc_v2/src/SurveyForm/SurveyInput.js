import avatarImage1 from "../img/avatar_1.png";
import avatarImage2 from "../img/avatar_2.png";
import avatarImage3 from "../img/avatar_3.png";
import avatarImage4 from "../img/avatar_4.png";
import avatarImage5 from "../img/avatar_5.png";
import avatarImage6 from "../img/avatar_6.png";
// ...

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
        <img style={{ height: "50px", width: "50px" }} src={avatarImage1}></img>
        <img style={{ height: "50px", width: "50px" }} src={avatarImage2}></img>
        <img style={{ height: "50px", width: "50px" }} src={avatarImage3}></img>
        <img style={{ height: "50px", width: "50px" }} src={avatarImage4}></img>
        <img style={{ height: "50px", width: "50px" }} src={avatarImage5}></img>
        <img style={{ height: "50px", width: "50px" }} src={avatarImage6}></img>
        <button>제출</button>
      </form>
    </div>
  );
}
