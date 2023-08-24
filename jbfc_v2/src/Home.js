import PollutionHome from "./Pollution/PollutionHome.js";
import WeatherHome from "./Weather/WeatherHome.js";

export default function Home() {
  //여기가 이제 화면 첫 페이지
  return (
    <div>
      Home!
      <WeatherHome />
      <PollutionHome />
    </div>
  );
}
