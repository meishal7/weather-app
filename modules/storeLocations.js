export default function storeLocations(weatherData, city) {
  const data = JSON.parse(localStorage.getItem("locations"));

  // Determine if it's day or night
  let dayTime = "";
  if (
    weatherData.current.dt > weatherData.current.sunrise &&
    weatherData.current.dt < weatherData.current.sunset
  ) {
    dayTime = "day";
  } else if (
    weatherData.current.dt > weatherData.current.sunrise &&
    weatherData.current.dt > weatherData.current.sunset
  ) {
    dayTime = "night";
  } else if (weatherData.current.dt < weatherData.current.sunrise) {
    dayTime = "night";
  }
  // If there is no saved cities
  if (data.cities.length == 0) {
    let obj = {
      name: city,
      temp: Math.floor(weatherData.current.temp),
      timezone: weatherData.timezone,
      lattitude: weatherData.lat,
      longtitude: weatherData.lon,
      condition: weatherData.current.weather[0].main,
      dayTime: dayTime,
    };

    data.cities.push(obj);
    localStorage.setItem("locations", JSON.stringify(data));
    return;
  }
  if (data.cities.some((el) => el.name === city)) return;

  let obj1 = {
    name: city,
    temp: Math.floor(weatherData.current.temp),
    timezone: weatherData.timezone,
    lattitude: weatherData.lat,
    longtitude: weatherData.lon,
    condition: weatherData.current.weather[0].main,
    dayTime: dayTime,
  };
  data.cities.push(obj1);
  localStorage.setItem("locations", JSON.stringify(data));
}
