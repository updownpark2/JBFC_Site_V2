export default class WeatherProcessor {
  constructor(weatherData) {
    this.weatherData = weatherData;
  }

  //unix 단위의 시간을 시/분 단위로 변경함
  #convertUnixToReadableTime(t) {
    const date = new Date(t * 1000);
    const dayOfWeekArr = ["일", "월", "화", "수", "목", "금", "토"];
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const dayOfWeek = date.getDay();
    return `${month}월${day}일${hour}시 ${dayOfWeekArr[dayOfWeek]}요일`;
  }

  #getReadableTime() {
    const readableTime = this.weatherData.filter((data, index) =>
      index % 8 === 0 ? this.#convertUnixToReadableTime(data.dt) : null
    );
    return readableTime;
  }

  #getHourFromWeatherData() {
    const hourTimeData = this.weatherData.map((data, _) =>
      new Date(data.dt * 1000).getHours()
    );

    return hourTimeData;
  }
  // 오전,오후,저녁 순서로 체감 기온 데이터를 담는 함수
  #getMoringEveningNightTemperatureData() {
    const morningEveningNight = [];
    // weatherData에서 hour데이터를 가져옴
    const hourTimeData = this.#getHourFromWeatherData();
    //여기서 시간 단위로 오전, 오후, 밤을 나눠서 그때의 평균 체감온도를 구함

    let arr = [];
    //hourTime데이터를 이용해 시간대 별 체감온도를 구분하여 morningEveningNight배열에 저장
    for (let i = 0; i < hourTimeData.length; i++) {
      if (hourTimeData[i] === 9 || hourTimeData[i] === 6) {
        arr[0] = this.weatherData[i].main.feels_like;
      } else if (hourTimeData[i] === 15 || hourTimeData[i] === 12) {
        arr[1] = this.weatherData[i].main.feels_like;
      } else if (
        hourTimeData[i] === 18 ||
        hourTimeData[i] === 21 ||
        hourTimeData[i] === 0
      ) {
        arr[2] = this.weatherData[i].main.feels_like;
      }
      if (hourTimeData[i] === 3) {
        morningEveningNight.push(arr);
        arr = [];
      }
    }

    return morningEveningNight;
  }

  // 여기서 이제 Rendering이 가능한 형태로 Control 컴포넌트에 넘겨주면된다.

  getProcessedTimeData() {
    const readableTime = this.#getReadableTime();
    //5일의 날짜데이터
    const morningEveningNight = this.#getMoringEveningNightTemperatureData();
    // 5일의 오전 오후 저녁 체감온도 데이터
    return [readableTime, morningEveningNight];
  }
}
