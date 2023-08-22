import { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginInput({ onSubmit }) {
  const [passwordVisible, setPasswordVisible] = useState(true);

  const togglePasswordVisibility = (event) => {
    event.preventDefault();
    setPasswordVisible((current) => !current);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input placeholder="ID" maxLength="10" />
        <input
          placeholder="PW"
          maxLength="15"
          type={passwordVisible ? "password" : null}
        />
        <button
          onClick={togglePasswordVisibility}
          style={{ backgroundColor: "white", border: "0" }}
        >
          👁
        </button>
        <br />
        <button>제출</button>
      </form>

      <Link to={`/signUp`}>회원이 아니신가요?</Link>
    </div>
  );
}
