// refreshSavedLocations()
// This function is called every time the app is loaded.
// It refreshes info for saved locations in local storage
import getWeather from "./getWeather";

const apiKey = process.env.KEY;

export default function refreshSavedLocations() {
  const data = JSON.parse(localStorage.getItem("locations"));
  if (!data) return;
  data.cities.forEach(async (el) => {
    console.log("refreshed");
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
    console.log(el.name, "temp is ", weatherData.current.temp);
    console.log(el.name, "time is ", savedLocTime);
    console.log(el.name, "condition is ", weatherData.current.weather[0].main);
    console.log(el.name, "day time is ", dayTime);

    el.temp = Math.floor(weatherData.current.temp);
    (el.time = savedLocTime),
      (el.condition = weatherData.current.weather[0].main),
      (el.dayTime = dayTime);
    //console.log(data);
  });

  localStorage.setItem("locations", JSON.stringify(data));
}
