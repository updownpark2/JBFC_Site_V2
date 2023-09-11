import { Link, useNavigate } from "react-router-dom";
import LoginInput from "./LoginInput.js";
import checkInputValid from "../CheckValid/checkInputValid.js";
import LoginModel from "./LoginModel.js";

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { userIdState } from "../atoms.js";
import axios from "axios";

export default function LoginHome() {
  // URL간 이동을 위해 React Hook 사용
  const navigate = useNavigate();
  const goToHome = () => navigate(`/home`);
  const goToSurvey = () => navigate(`/survey`);
  //LoginInput와 관련된 Submit
  const [userIdRecoilState, setUserIdRecoilState] = useRecoilState(userIdState);

  const saveUserIdInRecoil = (loginResult, ID) => {
    if (loginResult) {
      setUserIdRecoilState(ID);
      return;
    }
    throw new Error(`login 정보가 존재하지 않습니다.`);
    // 만약 일치하지 않는다면 error던지기
    // loginResult에 따라 ID를 Recoil에 저장
  };

  const goHomeOrSurvey = async () => {
    console.log(userIdRecoilState);
    userIdRecoilState === null ? goToSurvey() : goToHome();
    // 있으면 home으로 없으면 설문조사하러
  };

  const onSubmit = async (event) => {
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
      const loginmodel = new LoginModel(ID, PW);
      const loginResult = (await loginmodel.login()).data;

      saveUserIdInRecoil(loginResult, ID);

      goHomeOrSurvey();
      //여기서 true면 userId를 recoil에 저장하자

      //여기서 DB에 있는 정보인지를 판단함
      //판단하고 만약 play type이 정해져있지 않다면 설문 페이지를 rendering
    } catch (error) {
      // error가 존재한다면 alert로 메세지를 보냄
      alert(error);
    }
  };

  return (
    <div>
      <LoginInput onSubmit={onSubmit} />
    </div>
  );
}
