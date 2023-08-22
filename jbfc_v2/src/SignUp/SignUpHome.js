import checkInputValid from "../CheckValid/checkValid.js";
import SignUpInput from "./SignUpInput.js";

export default function SignUpHome() {
  const checkDuplicateID = (event) => {
    event.preventDefault();
    // ID, PW정보를 가져온 후
    const ID = event.target.parentElement[0].value;
    const PW = event.target.parentElement[1].value;

    const checkinputvalid = new checkInputValid(ID, PW);

    try {
      checkinputvalid.checkId();
      checkinputvalid.checkPw();

      console.log("DB와 비교합시다!");
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
