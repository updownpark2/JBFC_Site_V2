import axios from "axios";
import RepleInput from "./RepleInput";
import { useRecoilValue } from "recoil";
import { userIdState } from "../atoms";
import RepleOutput from "./RepleOutput";
import { useState } from "react";
import { makeCurrentTime } from "./RepleModel";

export default function RepleContoller({ componentId, componentName }) {
  const userId = useRecoilValue(userIdState);
  const [repleArr, setRepleArr] = useState([]);

  const insertRepleValueInDB = async (repleValue) => {
    const currentTime = makeCurrentTime();
    await axios.post(`http://localhost:8080/insert${componentName}RepleValue`, {
      userId: userId,
      componentId: componentId,
      repleValue: repleValue,
      currentTime: currentTime,
    });
  };

  const getRepleValue = async () => {
    const repleValue = await axios.post(
      `http://localhost:8080/get${componentName}RepleValue`,
      {
        componentId: componentId,
      }
    );
    const repleValueArr = await repleValue.data;
    setRepleArr(repleValueArr);
  };

  const onSubmitReple = async (event) => {
    event.preventDefault();
    const repleValue = event.target[0].value;
    //이거를 state로 저장해서 값이 바뀔 때 rerendering? 그럴필요는 없다
    //이제 이걸 db에 보내자
    event.target[0].value = ``;
    await insertRepleValueInDB(repleValue);
    await getRepleValue();
  };

  //여기서 그려야지

  return (
    <div>
      <RepleInput onSubmitReple={onSubmitReple} />
      <RepleOutput repleValue={repleArr} getRepleValue={getRepleValue} />
    </div>
  );
}
