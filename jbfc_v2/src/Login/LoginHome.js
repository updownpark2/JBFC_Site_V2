import LoginCheckValid from "./LoginCheckValid.js";
import LoginInput from "./LoginInput.js";

export default function LoginHome() {
  //LoginInput와 관련된 Submit
  const onSubmit = (event) => {
    event.preventDefault();
    //ID, PW를 가져옴
    const ID = event.currentTarget[0].value;
    const PW = event.currentTarget[1].value;
    // ID와 PW의 타당성을 검증함
    const logincheckvaild = new LoginCheckValid(ID, PW);

    logincheckvaild.checkId();
  };

  return (
    <div>
      <LoginInput onSubmit={onSubmit} />
    </div>
  );
}
