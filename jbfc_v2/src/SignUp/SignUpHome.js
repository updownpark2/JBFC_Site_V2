import checkInputValid from "../CheckValid/checkInputValid.js";
import SignUpInput from "./SignUpInput.js";

export default function SignUpHome() {
  const checkDuplicateID = (event) => {
    event.preventDefault();
    // Name ,ID, PW정보를 가져온 후
    const Name = event.target.parentElement[0].value;
    const ID = event.target.parentElement[1].value;
    const PW = event.target.parentElement[2].value;

    // 생성자 함수로 타당성 검증 함수 가져옴
    const checkinputvalid = new checkInputValid(Name, ID, PW);
    // 여기서 try catch문으로 ID,PW검증
    try {
      checkinputvalid.checkName();
      checkinputvalid.checkId();
      checkinputvalid.checkPw();
      //성공 시 함수 이곳에 실행
      //DB와 비교하는 함수가 들어와야함
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <SignUpInput checkDuplicateID={checkDuplicateID} />
    </div>
  );
}
