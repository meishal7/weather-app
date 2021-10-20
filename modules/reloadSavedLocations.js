import getWeather from "./getWeather";

const apiKey = process.env.KEY;

export default function reloadSavedLocations() {
  const data = JSON.parse(localStorage.getItem("locations"));
  if (!data) return;
  data.cities.forEach(async (el) => {
    const weatherData = await getWeather(el.lattitude, el.longtitude);
    // Convert EPOC time to normal time
    let savedLocTimeConv = new Date(weatherData.current.dt * 1000);
    let savedLocTimeArray = savedLocTimeConv.toLocaleTimeString().split(":");
    let savedLocTime =
      savedLocTimeArray[0] +
      "." +
      savedLocTimeArray[1] +
      savedLocTimeArray[2].charAt(3) +
      savedLocTimeArray[2].charAt(4);
    // Determine if it's day or night for choosing background image
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

    (el.temp = Math.floor(weatherData.current.temp)),
      (el.time = savedLocTime),
      (el.condition = weatherData.current.weather[0].main),
      (el.dayTime = dayTime);
  });
  localStorage.setItem("locations", JSON.stringify(data));
}
