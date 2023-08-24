export default function PollutionProcessor(pollutionData) {
  const pmGradeArr = ["매우좋음", "보통", "나쁨", "매우나쁨"];

  const pm10Value = pollutionData.pm10Value;
  const pm25Value = pollutionData.pm25Value;
  let pm10Grade = pmGradeArr[parseInt(pollutionData.pm10Grade) - 1];
  let pm25Grade = pmGradeArr[parseInt(pollutionData.pm25Grade) - 1];

  return [pm10Value, pm25Value, pm10Grade, pm25Grade];
}
