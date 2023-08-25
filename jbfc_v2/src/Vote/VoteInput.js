import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";

export default function VoteInput() {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div>
      <form>
        <input placeholder="제목" />
        <br />
        <ReactDatePicker
          locale={ko}
          showIcon
          dateFormat="yyyy/MM/dd  h:mm aa"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          showTimeSelect
        />
        <br />
        <input />
        <br />
        <input />
      </form>
    </div>
  );
}
