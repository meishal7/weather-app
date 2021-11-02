import getWeather from "./getWeather";
export default function refreshSavedLocations() {
  const data = JSON.parse(localStorage.getItem("locations"));
  if (!data) return;
  data.cities.forEach(async (el) => {
    console.log("refreshed");
    const weatherData = await getWeather(el.lattitude, el.longtitude);
    el.temp = Math.floor(weatherData.current.temp);
    el.time = weatherData.current.dt;
    el.condition = weatherData.current.weather[0].main;
    localStorage.setItem("locations", JSON.stringify(data));
  });
}
