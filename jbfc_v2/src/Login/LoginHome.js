import { Link, useNavigate } from "react-router-dom";
import LoginInput from "./LoginInput.js";
import checkInputValid from "../CheckValid/checkInputValid.js";

export default function LoginHome() {
  // URL간 이동을 위해 React Hook 사용
  const navigate = useNavigate();

  const goToHome = () => navigate(`/home`);
  //LoginInput와 관련된 Submit
  const onSubmit = (event) => {
    event.preventDefault();
    //ID, PW를 가져옴
    const ID = event.currentTarget[0].value;
    const PW = event.currentTarget[1].value;
    // ID와 PW의 타당성을 검증함
    const checkvalid = new checkInputValid(null, ID, PW, null, null);

    // try catch를 여기서 해야할듯
    try {
      checkvalid.checkId();
      checkvalid.checkPw();
      //통과하면 여기서부터 실행됨 => 서버에 ID PW넘겨주고 일치불일치를 찾아야함
      //
      goToHome();
      //여기서 DB에 있는 정보인지를 판단함
      //판단하고 만약 play type이 정해져있지 않다면 설문 페이지를 rendering
    } catch (error) {
      // error가 존재한다면 alert로 메세지를 보냄
      alert(error.message);
    }
  };

  return (
    <div>
      <LoginInput onSubmit={onSubmit} />
    </div>
  );
}
