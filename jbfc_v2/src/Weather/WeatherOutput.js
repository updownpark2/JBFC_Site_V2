export default function WeatherOutput({ weaterData }) {
  const date = new Date().getDate();

  const timeData = weaterData[0];
  const temperaturData = weaterData[1];
  console.log(timeData);
  console.log(temperaturData);

  return (
    <div>
      {weaterData.length === 0 ? (
        <h2>로딩중</h2>
      ) : (
        <div>
          {temperaturData.map((data, index) => (
            <div key={index}>
              <h4>{date + index}일</h4>
              <div>
                <span>
                  <img
                    src={`https://openweathermap.org/img/wn/${timeData[index].weather[0].icon}@2x.png`}
                  />
                </span>
                <div>
                  <span>아침</span>
                  <span>{data[0] === undefined ? "???" : data[0]}</span>
                </div>
                <div>
                  <span>점심</span>
                  <span>{data[1] === undefined ? "???" : data[1]}</span>
                </div>
                <span>저녁</span>
                <span>{data[2] === undefined ? "???" : data[2]}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
