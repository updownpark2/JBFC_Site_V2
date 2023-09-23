import { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginInput({ onSubmit }) {
  const [passwordVisible, setPasswordVisible] = useState(true);

  const togglePasswordVisibility = (event) => {
    event.preventDefault();
    setPasswordVisible((current) => !current);
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
      <h1 className="text-3xl font-semibold mb-6 text-center text-purple-500">
        JJACK BALANCE
      </h1>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <input
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-purple-700"
            type="text"
            placeholder="아이디"
            maxLength="10"
          />
        </div>
        <div className="mb-4 relative">
          <input
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-purple-700"
            type={passwordVisible ? "text" : "password"}
            placeholder="비밀번호"
            maxLength="15"
          />
          <button
            className="absolute inset-y-0 right-0 px-3 py-2 focus:outline-none"
            onClick={togglePasswordVisibility}
          >
            보기
          </button>
        </div>
        <div className="mb-6">
          <button
            className="w-full py-2 bg-purple-500 text-white rounded hover:bg-purple-700 focus:outline-none"
            type="submit"
          >
            로그인
          </button>
        </div>
      </form>
      <p className="text-center text-gray-600 text-sm">
        <Link className="text-purple-500" to="/signUp">
          회원이 아니신가요?
        </Link>
      </p>
    </div>
  );
}
