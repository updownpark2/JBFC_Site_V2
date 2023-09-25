import axios from "axios";
import checkInputValid from "../CheckValid/checkInputValid.js";
import SignUpInput from "./SignUpInput.js";
import { useState } from "react";
import SignUpModel from "./SignUpModel.js";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

export default function SignUpHome() {
  const [idExist, setIdExist] = useState(null);
  const navigate = useNavigate();
  const goToHome = () => navigate(`/`);

  const validateUserInput = (event) => {
    event.preventDefault();
    // Name ,ID, PW정보를 가져온 후

    const Name = event.target.parentElement.parentElement[0].value;
    const ID = event.target.parentElement.parentElement[1].value;
    const PW = event.target.parentElement.parentElement[3].value;

    // 생성자 함수로 타당성 검증 함수 가져옴
    const checkinputvalid = new checkInputValid(Name, ID, PW, null, null);
    // 여기서 try catch문으로 ID,PW검증
    try {
      checkinputvalid.checkName();
      checkinputvalid.checkId();
      checkinputvalid.checkPw();
      //성공 시 함수 이곳에 실행
      const signupmodel = new SignUpModel(Name, ID, PW);

      signupmodel.signUpIfValidCredentials(idExist);

      swal("성공", "회원가입 성공", "success");

      setTimeout(() => {
        goToHome();
      }, 2000);

      // 중복검사했는지에 따라서
      //DB와 비교하는 함수가 들어와야함
    } catch (error) {
      alert(error.message);
    }
  };

  const checkDuplicateID = async (event) => {
    event.preventDefault();
    // 이곳에서 서버와 통신하여 DB의 ID와 검증을 거침
    const candidateID = event.target.parentElement.parentElement[1].value;
    //model에서 mongDB에 해당 ID가 있는지를 Check하려고 생성자함수를 사용함
    const signupmodel = new SignUpModel(null, candidateID, null);
    // id가 존재하는지를 boolean타입으로 가쟈오는함수
    let idExist;

    candidateID === ``
      ? (idExist = true)
      : (idExist = await signupmodel.findIdInMongoDB());

    //useState를 사용해서 View에게 데이터를 넘길준비를 함
    idExist
      ? swal("실패", "이미 존재하는 ID 입니다 !", "error")
      : swal("성공", "가능한 ID 입니다", "success");
    setIdExist(idExist);
    // div가 있어서안댐
    //이걸 view로 보내서 조절

    //null => id 중복검사를 해주세요.
    //true => 중복된 id가 있습니다.
    //false => 회원가입 성공 및 login page로.
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-500">
      <SignUpInput
        validateUserInput={validateUserInput}
        checkDuplicateID={checkDuplicateID}
        idExist={idExist}
      />
    </div>
  );
}
