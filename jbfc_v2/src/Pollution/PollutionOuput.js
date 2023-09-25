export default function PollutionOutput({ pollutionData }) {
  const [pm10Value, pm25Value, pm10Grade, pm25Grade] = pollutionData;
  let todayPollutionCondition;
  if (pm10Grade === "매우나쁨" || pm25Grade === "매우나쁨") {
    todayPollutionCondition = "fa-solid fa-poop";
  } else if (pm10Grade === "나쁨" || pm25Grade === "나쁨") {
    todayPollutionCondition = "fa-regular fa-face-grin-beam-sweat";
  } else if (pm10Grade === "보통" || pm25Grade === "보통") {
    todayPollutionCondition = "fa-regular fa-face-grin-wide";
  } else if (pm10Grade === "좋음" || pm25Grade === "좋음") {
    todayPollutionCondition = "fa-regular fa-face-smile";
  } else if (pm10Grade === "매우좋음" || pm25Grade === "매우좋음") {
    todayPollutionCondition = "fa-regular fa-face-smile-wink";
  }

  return (
    <div className="bg-gray-300 p-4 mt-4">
      <div className="flex items-center space-x-2">
        <i className={todayPollutionCondition}></i>
        <span className="text-lg">미세먼지: {pm10Value}pm</span>
        <span className="text-lg">초미세먼지: {pm25Value}pm</span>
      </div>
    </div>
  );
}
