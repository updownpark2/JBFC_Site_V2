import axios from "axios";

export default class SignUpModel {
  #idExist;

  constructor(userId, userName, userPw) {
    this.userId = userId;
    this.userName = userName;
    this.userPw = userPw;
  }

  async #findIdInMongoDB() {
    const postCandidateID = await axios.post(
      "http://localhost:8080/isDuplicateID",
      {
        userId: this.userId,
      }
    );

    this.#idExist = postCandidateID.data;
    // DB에 있는지 없는지를 확인하는 boolean 타입을 반환받음
  }

  async getIdExist() {
    await this.#findIdInMongoDB();

    return this.#idExist;
  }
}
