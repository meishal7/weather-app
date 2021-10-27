import displayCurrLocationWeather from "./displayCurrLocationWeather";
import getWeather from "./getWeather";

export default function displayWeatherFromSavedLoc(event) {
  const footer = document.querySelector(".footer");
  footer.classList.toggle("footer-open");
  const data = JSON.parse(localStorage.getItem("locations"));
  data.cities.forEach(async (city) => {
    if (city.name == event.target.childNodes[0].innerText) {
      const weatherData = await getWeather(city.lattitude, city.longtitude);
      const { hourly, daily } = weatherData;
      const hourWeatherList = document.querySelector(".hour-weather-list");
      const weekWeatherList = document.querySelector(".week-weather-list");
      
      while (hourWeatherList.firstChild && hourWeatherList.lastChild) {
        hourWeatherList.removeChild(hourWeatherList.firstChild);
      }
      while (weekWeatherList.firstChild && weekWeatherList.lastChild) {
        weekWeatherList.removeChild(weekWeatherList.firstChild);
      }

      displayCurrLocationWeather(
        weatherData,
        city.name,
        hourly,
        daily,
        data.defaultDegree
      );
    }
  });
}
