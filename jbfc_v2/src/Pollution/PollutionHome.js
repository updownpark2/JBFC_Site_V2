import axios from "axios";
import { useEffect } from "react";

export default function PollutionHome() {
  const callPollutionAPI = async () => {
    try {
      //여기서 미세먼지 정보를 가져오고
      const pollutionData = await axios.get(
        `https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?serviceKey=ZHRtNHeVdq3RstoihtljiyUq1bREx70chuG19hWrdBrZr8cs%2Bzcc1KtztI15NVWUwNWX7qTJQFG8gcgdTEILUA%3D%3D&returnType=json&numOfRows=10&pageNo=1&sidoName=%EA%B4%91%EC%A3%BC&ver=1.0`
      );
      return pollutionData.data.response.body.items[7];
      // 데이터를 가져오는데 성공하면 미세먼지 정보 return
    } catch (error) {
      alert(
        "미세먼지 정보를 가져오는데 실패했습니다. 위치정보에 동의해주세요."
      );
      // 데이터를 가져오는데 실패하면 alert를 통해 알림
    }
  };

  const getPollutionData = async () => {
    try {
      const pollutionData = await callPollutionAPI();
      console.log(pollutionData);
      //여기서 이제 pollutionModel로 보내서 데이터 가공후에
      // 받아서 뿌리면된다.
    } catch (error) {
      alert(error);
      // 실패한다면 해당 에러 메세지를 가져와 던진다.
    }
  };
  useEffect(() => {
    getPollutionData();
  }, []);
  // 나중엔 useQuery로 호출해서 캐싱도하고 isLoading 변수를 사용해서 Loading창도만들어야함

  return <div>미세먼지알려줭</div>;
}
