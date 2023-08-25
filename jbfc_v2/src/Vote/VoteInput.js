import { useState, version } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";

export default function VoteInput({ sendVoteData }) {
  // React-datepicker 라이브러리 사용을 위해 useState사용
  const [startDate, setStartDate] = useState(new Date());

  // 참여, 불참 등 투표 Input을 제거해주는 함수
  const removeInputField = (event) => {
    const span = event.target.parentElement;
    span.remove();
  };

  //참여, 불참 등 투표 Input을 추가해주는 함수
  const addInputField = () => {
    const inputBox = document.getElementById("InputBox");
    const span = document.createElement("span");
    const input = document.createElement("input");
    const button = document.createElement("button");
    input.placeholder = "투표내용";
    input.className = "voteOption";
    button.type = "button";
    button.onclick = removeInputField;
    button.innerText = "-";

    span.appendChild(input);
    span.appendChild(button);

    inputBox.appendChild(span);
  };

  return (
    <div>
      <form onSubmit={sendVoteData}>
        <ReactDatePicker
          locale={ko}
          showIcon
          dateFormat="yyyy/MM/dd  h:mm aa"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          showTimeSelect
          id="datePicker"
        />
        <br />
        <div id="InputBox">
          <input placeholder="제목" id="voteTitle" />

          <span>
            <input placeholder="투표내용" className="voteOption" />
            <button type="button" onClick={removeInputField}>
              -
            </button>
          </span>
        </div>
        <button type="button" onClick={addInputField}>
          +
        </button>
        <br />
        <input type="checkbox" name="중복투표" className="checkBox" /> 중복투표
        <br />
        <input type="checkbox" name="익명투표" className="checkBox" /> 익명투표
        <br />
        <button>생성</button>
      </form>
    </div>
  );
}
