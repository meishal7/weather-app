const hourWeatherList = document.querySelector(".hour-weather-list");
const weekWeatherList = document.querySelector(".week-weather-list");
export default function removeNodes() {
  while (hourWeatherList.firstChild && hourWeatherList.lastChild) {
    hourWeatherList.removeChild(hourWeatherList.firstChild);
  }
  while (weekWeatherList.firstChild && weekWeatherList.lastChild) {
    weekWeatherList.removeChild(weekWeatherList.firstChild);
  }
}
