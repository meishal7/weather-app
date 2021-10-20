const currTemp = document.querySelector(".curr-weather-temp");
const currWeatherMin = document.querySelector(".curr-weather-min");
const currWeatherMax = document.querySelector(".curr-weather-max");
const hourTemp = document.querySelector("hour-temp");
export default function switchCelcius() {
  console.log("this node value is ", currTemp.textContent);
  console.log("this node value is ", currWeatherMin.textContent);
  console.log("this node value is ", hourTemp.textContent);
}
