import axios from "axios";
import { useEffect, useState } from "react";

export default function RepleOutput({ repleValue, getRepleValue }) {
  useEffect(() => {
    getRepleValue();
    //이게 한번만 사용하니까?
  }, []);
  console.log(repleValue);
  return (
    <div>
      {repleValue.map((item, index) => (
        <div key={index}>
          <span>
            {item.userId}: {item.repleValue} {item.currentTime}
          </span>
        </div>
      ))}
    </div>
  );
}
