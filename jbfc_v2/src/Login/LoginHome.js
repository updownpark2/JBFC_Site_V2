import { Link, useNavigate } from "react-router-dom";
import LoginInput from "./LoginInput.js";
import checkInputValid from "../CheckValid/checkInputValid.js";
import LoginModel from "./LoginModel.js";

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { userIdState } from "../atoms.js";
import axios from "axios";
import Alert from "../Alert.js";
import swal from "sweetalert";

export default function LoginHome() {
  // URL간 이동을 위해 React Hook 사용
  const navigate = useNavigate();
  const goToHome = () => navigate(`/home`);
  const goToSurvey = () => navigate(`/survey`);
  const setUserDetailInfo = useSetRecoilState(userIdState);
  //LoginInput와 관련된 Submit

  const findUserDetailInfo = async (userId) => {
    const haveUserDetailInfo = await axios.post(
      `http://localhost:8080/getUserDetailInfo`,
      {
        userId: userId,
      }
    );
    // 만약 해당 프로필에 대한 정보가 있으면 그냥 ㄱ 아니면 x
    return haveUserDetailInfo.data;
  };

  const goHomeOrSurvey = async (ID) => {
    const haveUserDetailInfo = await findUserDetailInfo(ID);

    haveUserDetailInfo ? goToHome() : goToSurvey();
    // 있으면 home으로 없으면 설문조사하러
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    //ID, PW를 가져옴
    const ID = event.currentTarget[0].value;
    const PW = event.currentTarget[1].value;
    // ID와 PW의 타당성을 검증함
    console.log(ID);
    const checkvalid = new checkInputValid(null, ID, PW, null, null);

    // try catch를 여기서 해야할듯
    try {
      checkvalid.checkId();
      checkvalid.checkPw();
      //통과하면 여기서부터 실행됨 => 서버에 ID PW넘겨주고 일치불일치를 찾아야함
      const loginmodel = new LoginModel(ID, PW);
      await loginmodel.login();
      //이게 DB에 Login에 알맞는 정보가 있는지를 확인해준다.
      swal("로그인 성공", "환영합니다 !", "");

      goHomeOrSurvey(ID);
      // 만약 여기서 Home으로 간다면? 저장해야지 recoil을
      setUserDetailInfo(ID);
      //recoil은 여기서저장

      //여기서 true면 userId를 recoil에 저장하자
      swal("로그인 성공", "환영합니다 !", "success");
      //여기서 DB에 있는 정보인지를 판단함
      //판단하고 만약 play type이 정해져있지 않다면 설문 페이지를 rendering
    } catch (error) {
      // error가 존재한다면 alert로 메세지를 보냄
      swal("로그인 실패", error.message, "error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-300">
      <LoginInput onSubmit={onSubmit} />
    </div>
  );
}
