export default class checkInputValid {
  constructor(Name, ID, PW, NickName, BackNum) {
    this.Name = Name;
    this.ID = ID;
    this.PW = PW;
    this.NickName = NickName;
    this.BackNum = BackNum;
  }
  // 공백을 Check하는 함수
  #checkBlank(input) {
    const blankPattern = /[\s]/g;
    if (blankPattern.test(input)) {
      return true;
      //만약 공백이 존재하면 true를 반환
    }
    return false;
  }
  //아무것도 입력하지 않았을 때를 Check하는 함수
  #checkNothingInput(input) {
    if (input.length === 0) {
      return true;
    }
    return false;
  }
  // 특수문자가 포함되어있는지를 check하는 함수

  #checkSpecialChars(input) {
    const specialPattern = /[^가-힣\w\s]|_/g;
    if (specialPattern.test(input)) {
      return true;
    }
    return false;
  }
  // 영어와 숫자만 사용했는지를 check하는 함수
  #checkValidAlphanumeric(input) {
    const alphanumeric = /^[A-Za-z0-9]*$/;
    if (!alphanumeric.test(input)) {
      return true;
    }
    return false;
  }
  //Name을 Check하는 함수

  #checkHasNumber(input) {
    const hasNumber = /^[0-9]*$/;
    if (hasNumber.test(input)) {
      return true;
    }
    return false;
  }

  checkName() {
    if (this.#checkBlank(this.Name)) {
      throw new Error("이름에 공백이 존재합니다.");
    }
    if (this.#checkNothingInput(this.Name)) {
      throw new Error("이름에 입력값이 없습니다.");
    }
    if (this.#checkSpecialChars(this.Name)) {
      throw new Error("이름에는 특수문자, 초성만 포함될 수 없습니다.");
    }
  }

  // id를 Check하는 함수
  checkId() {
    //하나라도 true 이면 막아야해!
    if (this.#checkBlank(this.ID)) {
      throw new Error("ID에 공백이 존재합니다.");
    }
    if (this.#checkNothingInput(this.ID)) {
      throw new Error("ID에 입력값이 없습니다.");
    }
    if (this.#checkValidAlphanumeric(this.ID)) {
      throw new Error("ID에는 영어와 숫자만 사용이 가능합니다.");
    }
    if (this.#checkSpecialChars(this.ID)) {
      throw new Error("ID에는 특수문자가 포함될 수 없습니다.");
    }
  }
  // pw를 Check하는 함수
  checkPw() {
    //하나라도 true 이면 막아야해!
    if (this.#checkBlank(this.PW)) {
      throw new Error("PW에 공백이 존재합니다.");
    }
    if (this.#checkNothingInput(this.PW)) {
      throw new Error("PW에 입력값이 없습니다.");
    }
  }

  checkNickName() {
    if (this.#checkBlank(this.NickName)) {
      throw new Error("닉네임에 공백이 존재합니다.");
    }
    if (this.#checkNothingInput(this.NickName)) {
      throw new Error("닉네임에 입력값이 없습니다.");
    }
    if (this.#checkSpecialChars(this.NickName)) {
      throw new Error("이름에는 특수문자, 초성만 포함될 수 없습니다.");
    }
    if (this.#checkHasNumber(this.NickName)) {
      throw new Error("닉네임에 숫자는 포함될 수 없습니다.");
    }
    return this.NickName;
  }
  //PW가 아닌 back넘버가 들어가지만 매개변수를 추가하지 않고 BackNum 대신 사용
  checkBackNum() {
    if (this.#checkBlank(this.BackNum)) {
      throw new Error("등번호에 공백이 존재합니다.");
    }
    if (this.#checkNothingInput(this.BackNum)) {
      throw new Error("등번호에 입력값이 없습니다.");
    }
    return this.BackNum;
  }
  checkPosition(event) {
    // 선택하지 않은 Position이 있다면 에러를날림
    for (let i = 1; i <= 5; i++) {
      if (event.target[i].checked) {
        return i;
      }
    }
    throw new Error("적어도 한개의 포지션을 선택해주세요.");
  }
  checkVoteTitle(title) {
    if (title.length === 0) {
      throw new Error(`투표 제목이 공백입니다.`);
    }
  }
  checkVoteText(textArr) {
    for (let i = 0; i < textArr.length; i++) {
      if (textArr[i] === ``) {
        throw new Error(`투표 내용에 공백이 있습니다.`);
      }
    }
  }
}
