import { useNavigate } from "react-router-dom";
import checkInputValid from "../CheckValid/checkInputValid";
import SurveyInput from "./SurveyInput";

export default function SurveyHome() {
  const navigate = useNavigate();

  const goToHome = () => navigate(`/home`);

  // user가 입력한 닉네임과 등번호를 검증하기
  const validateUserInput = (event) => {
    // 초기화를 막고
    event.preventDefault();
    console.log(event);

    const nicknameCandidate = event.target[0].value;
    const backNumCandidate = event.target[6].value;
    // 닉네임과 등번호를 넣고 타당성검사

    //여기서 이제 check안된게있다면 통과안시켜야함
    const checkinputvalid = new checkInputValid(
      null,
      null,
      null,
      nicknameCandidate,
      backNumCandidate
      // string으로 넣어야 length로 타당성검사가능
    );

    try {
      // nickName, backNum, position에 대한 입력값 검사
      const nickName = checkinputvalid.checkNickName();
      const backNum = checkinputvalid.checkBackNum();
      const positionNum = checkinputvalid.checkPosition(event);

      console.log(nickName, backNum, positionNum);
      // 만약 positionNum이 검증에 성공하면 그때의 포지션에 대한 정보를 저장한다.

      goToHome();
      // 통과하면 여기에서 이제 등번호와 포지션 닉네임을 저장하고 home으로 이동
    } catch (error) {
      alert(error.message);
      //여기서 타당성검사시 메세지도 다르고 문제가 발생
    }
  };

  return (
    <div>
      <SurveyInput validateUserInput={validateUserInput} />
    </div>
  );
}
