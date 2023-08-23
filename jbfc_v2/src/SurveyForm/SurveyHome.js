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

    const nickName = event.target[0].value;
    const backNum = event.target[6].value;
    // 닉네임과 등번호를 넣고 타당성검사
    const checkinputvalid = new checkInputValid(
      nickName,
      null,
      backNum
      // string으로 넣어야 length로 타당성검사가능
    );

    try {
      checkinputvalid.checkNickName();
      checkinputvalid.checkBackNum();
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
