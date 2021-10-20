import displaySavedLocations from "./displaySavedLocations";
export default function storeLocations(weatherData, city) {
  const data = JSON.parse(localStorage.getItem("locations"));
  // Convert time from EPOC to normal time
  let savedLocTimeConv = new Date(weatherData.current.dt * 1000);
  let savedLocTimeArray = savedLocTimeConv.toLocaleTimeString().split(":");
  let savedLocTime =
    savedLocTimeArray[0] +
    "." +
    savedLocTimeArray[1] +
    savedLocTimeArray[2].charAt(3) +
    savedLocTimeArray[2].charAt(4);
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

  if (!data) {
    let obj = {
      name: city,
      temp: Math.floor(weatherData.current.temp),
      time: savedLocTime,
      lattitude: weatherData.lat,
      longtitude: weatherData.lon,
      condition: weatherData.current.weather[0].main,
      dayTime: dayTime,
    };

    const locations = { cities: [] };
    locations.cities.push(obj);
    localStorage.setItem("locations", JSON.stringify(locations));
    displaySavedLocations();
    return;
  } else if (data.cities.some((el) => el.name === city)) {
    displaySavedLocations();
    return;
  } else {
    let obj1 = {
      name: city,
      temp: Math.floor(weatherData.current.temp),
      time: savedLocTime,
      lattitude: weatherData.lat,
      longtitude: weatherData.lon,
      condition: weatherData.current.weather[0].main,
      dayTime: dayTime,
    };
    data.cities.push(obj1);
    localStorage.setItem("locations", JSON.stringify(data));
    displaySavedLocations();
  }
}
