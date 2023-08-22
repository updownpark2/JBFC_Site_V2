import { Link, useNavigate } from "react-router-dom";
import LoginCheckValid from "./LoginCheckValid.js";
import LoginInput from "./LoginInput.js";

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
    const logincheckvaild = new LoginCheckValid(ID, PW);
    // try catch를 여기서 해야할듯
    try {
      logincheckvaild.checkId();
      logincheckvaild.checkPw();
      //통과하면 여기서부터 실행됨 => 서버에 ID PW넘겨주고 일치불일치를 찾아야함
      //
      goToHome();
      //여기서 DB에 있는 정보인지를 판단함
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
