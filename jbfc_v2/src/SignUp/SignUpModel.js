import axios from "axios";

export default class SignUpModel {
  #idExist;

  constructor(userName, userId, userPw) {
    this.userName = userName;
    this.userId = userId;
    this.userPw = userPw;
  }

  async findIdInMongoDB() {
    const postCandidateID = await axios.post(
      "http://localhost:8080/isDuplicateID",
      {
        userId: this.userId,
      }
    );

    const isHaveIdInMongoDB = await postCandidateID.data;

    return isHaveIdInMongoDB;
    // DB에 있는지 없는지를 확인하는 boolean 타입을 반환받음
  }

  #insertIdInMongoDB() {
    axios.post(`http://localhost:8080/insertUserInfo`, {
      userId: this.userId,
      userPw: this.userPw,
      userName: this.userName,
    });
  }

  signUpIfValidCredentials(idExist) {
    if (idExist === null) {
      throw new Error("id 중복검사를 실행해주세요,");
    }
    if (idExist === true) {
      throw new Error("중복된 id 입니다.");
    }
    if (idExist === false) {
      //db랑연결해서 데이터 넣기까지

      this.#insertIdInMongoDB();
    }
  }
}
