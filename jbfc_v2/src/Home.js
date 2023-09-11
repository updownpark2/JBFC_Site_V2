import { useRecoilValue } from "recoil";
import PollutionHome from "./Pollution/PollutionHome.js";
import WeatherHome from "./Weather/WeatherHome.js";
import { userIdState } from "./atoms.js";

export default function Home() {
  //여기가 이제 화면 첫 페이지
  const userId = useRecoilValue(userIdState);

  return (
    <div>
      <h2>반갑습니다.{userId}님!</h2>
      <WeatherHome />
      <PollutionHome />
    </div>
  );
}
