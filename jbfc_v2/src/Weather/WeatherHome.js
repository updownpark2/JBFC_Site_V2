import axios from "axios";
import { useEffect, useState } from "react";
import WeatherProcessor from "./WeatherProcessor";
import WeatherOutput from "./WeatherOutput";

export default function WeatherHome() {
  const [weatherData, setWeaterData] = useState([]);

  const callGeolocationAPI = () => {
    // 위치정보를 가져오는 API
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // position은 가져오게되면 resolve에 위치정보를 담는다.
          resolve([position.coords.latitude, position.coords.longitude]);
        },
        //만약 실패한다면 해당 메세지를 담는다.
        () =>
          reject("날씨정보를 가져오는데 실패했습니다. 위치정보에 동의해주세요.")
      );
    });
  };

  const callWeatherAPI = async (lat, lon) => {
    try {
      const weatherData = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=07412e5439fdfff8f24192913471de2f`
      );
      return weatherData.data.list;
      // 데이터를 가져오는데 성공하면 날씨 데이터를 return
    } catch (error) {
      alert("날씨정보를 가져오는데 실패했습니다. 위치정보에 동의해주세요.");
      // 데이터를 가져오는데 실패하면 alert를 통해 알림
    }
  };

  const getWeatherData = async () => {
    try {
      const [lat, lon] = await callGeolocationAPI();
      const weatherData = await callWeatherAPI(lat, lon);
      const weatherprocessor = new WeatherProcessor(weatherData);
      //여기서 이제 weather model로내서 데이터 가공후에
      const [timeWeatherData, temperaturData] =
        weatherprocessor.getProcessedTimeData();
      // 받아서 뿌리면된다.
      setWeaterData([timeWeatherData, temperaturData]);
    } catch (error) {
      alert(error);
      // 실패한다면 해당 에러 메세지를 가져와 던진다.
    }
  };
  useEffect(() => {
    getWeatherData();
  }, []);

  return (
    <div>
      {weatherData.length === 0 ? (
        <h2>로딩중</h2>
      ) : (
        <WeatherOutput weatherData={weatherData} />
      )}
    </div>
  );
}
