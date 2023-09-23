import { useState } from "react";

export default function SignUpInput({
  validateUserInput,
  checkDuplicateID,
  idExist,
}) {
  const [passwordVisible, setPasswordVisible] = useState(true);

  const togglePasswordVisibility = (event) => {
    event.preventDefault();
    setPasswordVisible((current) => !current);
  };
  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 className="text-3xl font-semibold mb-6 text-center text-blue-500">
        회원가입
      </h1>
      <form>
        <div className="mb-4 relative">
          <input
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-700"
            type="text"
            placeholder="이름"
            maxLength="10"
          />
        </div>
        <div className="mb-4 relative">
          <input
            name="userId"
            className={`w-full p-2 border rounded focus:outline-none ${
              idExist ? "border-red-500" : "border-green-500"
            }`}
            type="text"
            placeholder="ID"
            maxLength="10"
          />
          <button
            className="absolute inset-y-0 right-0 px-3 py-2 focus:outline-none"
            type="button"
            onClick={checkDuplicateID}
          >
            중복확인
          </button>
        </div>
        <div className="mb-4 relative">
          <input
            name="userPw"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none"
            type={passwordVisible ? "text" : "password"}
            placeholder="비밀번호"
            maxLength="15"
          />
          <button
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 px-3 py-2 focus:outline-none"
            type="button"
          >
            👁
          </button>
        </div>
        <div className="mb-6">
          <button
            onClick={validateUserInput}
            className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none"
            type="button"
          >
            제출
          </button>
        </div>
      </form>
    </div>
  );
}
