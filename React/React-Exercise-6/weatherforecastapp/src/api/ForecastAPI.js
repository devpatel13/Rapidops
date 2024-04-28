const fetchData = async (city) => {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.REACT_APP_API_KEY}`
    );
    if (!response || response.status !== 200)
      return { status: 500, message: "Error fetching city lat and lan" };
    const result = await response.json();
    console.log(result);
    if (result.length === 0)
      return { status: 400, message: "Data for given city is not available" };
    console.log(result[0].name, result[0].state);
    const lat = result[0].lat;
    const lon = result[0].lon;
    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=6&appid=${process.env.REACT_APP_API_KEY}`
    );
    if (!forecastResponse || forecastResponse.status !== 200)
      return { status: 500, message: "Error fetching forecast from network" };
    const forecastResult = await forecastResponse.json();
    console.log(forecastResult.list);
    const tempForecastList = [];
    let key = 0;
    forecastResult.list.forEach((elem) => {
      const date = new Date(+elem.dt * 1000);
      tempForecastList.push({
        key: key + 1,
        date: date.toDateString(),
        weatherIcon: elem.weather[0].icon,
        cityName: result[0].name,
        stateName: result[0].state,
        temp: (elem.main.temp - 273.15).toFixed(2),
        feelsLike: (elem.main.feels_like - 273.15).toFixed(2),
        maxTemp: (elem.main.temp_max - 273.15).toFixed(2),
        minTemp: (elem.main.temp_min - 273.15).toFixed(2),
        weather: elem.weather[0].description,
        humidity: elem.main.humidity,
        wind: (elem.wind.speed * 3.6).toFixed(2),
      });
    });
    return { status: 200, tempForecastList };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default fetchData;
