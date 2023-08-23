import { useState } from "react";

export default function SignUpInput({ validateUserInput, checkDuplicateID }) {
  const [passwordVisible, setPasswordVisible] = useState(true);

  const togglePasswordVisibility = (event) => {
    event.preventDefault();
    setPasswordVisible((current) => !current);
  };
  return (
    <div>
      <form>
        <input placeholder="이름" maxLength="10" />
        <br />
        <input placeholder="ID" maxLength="10" />
        <button type="button" onClick={checkDuplicateID}>
          중복확인
        </button>
        <br />
        <input
          placeholder="PW"
          maxLength="15"
          type={passwordVisible ? "password" : null}
        />
        <button
          onClick={togglePasswordVisibility}
          style={{ backgroundColor: "white", border: "0" }}
          type="button"
        >
          👁
        </button>
        <button onClick={validateUserInput}>제출</button>
      </form>
    </div>
  );
}
