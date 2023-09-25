export default function WeatherOutput({ weatherData }) {
  const date = new Date().getDate();

  const timeData = weatherData[0];
  const temperatureData = weatherData[1];

  return (
    <div className="bg-purple-300 text-white p-4 mt-4 ">
      <div className="flex flex-wrap justify-center -mx-4">
        {temperatureData.map((data, index) => (
          <div
            key={index}
            className="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-4 mb-4"
          >
            <div className="bg-white p-4 rounded-lg shadow-md ">
              <h4 className="text-xl font-semibold text-purple-500">
                {date + index}일
              </h4>
              <div className="flex items-center space-x-4">
                <span>
                  <img
                    src={`https://openweathermap.org/img/wn/${timeData[index].weather[0].icon}@2x.png`}
                    className="w-13 h-12"
                  />
                </span>
                <div className="flex flex-col text-purple-500 text-base">
                  <div className="flex items-center">
                    <span className="font-semibold">아침</span>
                    <span className="ml-2">
                      {data[0] === undefined ? "???" : data[0]}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold">점심</span>
                    <span className="ml-2">
                      {data[1] === undefined ? "???" : data[1]}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold">저녁</span>
                    <span className="ml-2">
                      {data[2] === undefined ? "???" : data[2]}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
