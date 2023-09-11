import axios from "axios";

export default class LoginModel {
  constructor(ID, PW) {
    this.ID = ID;
    this.PW = PW;
  }

  //DB와 비교해서 만약 일치하는게 있는지 없는지를 확인해야함

  async ExistIdPwInDB() {
    //axios로 호출해서 확인
    const postCandidateIdPw = await axios.post(
      `http://localhost:8080/isExistIdPw`,
      {
        userId: this.ID,
        userPw: this.PW,
      }
    );
    const ExistIdPw = await postCandidateIdPw.data;

    return ExistIdPw;
  }
  async login() {
    const resultLogin = await axios.post(`http://localhost:8080/login`, {
      userId: this.ID,
      userPw: this.PW,
    });

    if (resultLogin.data === false) {
      throw new Error(`일치하지 않는 로그인 정보입니다.`);
    }
  }
}
