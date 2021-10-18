import "regenerator-runtime/runtime"; // For solving error
import getLatLong, { coordinates } from "./modules/getLatLong";
import getWeather from "./modules/getWeather";
import displayWeather from "./modules/displayWeather";
import initMap from "./modules/googlePlaces";

const searchBtn = document.querySelector("#search-btn");
const footer = document.querySelector(".footer");
const input = document.querySelector("#search-input");
// let locations = { cities: [] };

const toggleLoadding = () =>
  document.querySelector(".spinner").classList.toggle("loading");

initMap(input);

const weather = async () => {
  toggleLoadding();
  await getLatLong();
  let lat = coordinates[0];
  let lon = coordinates[1];
  console.log(lat, lon);
  let currCity = coordinates[2];
  const weatherData = await getWeather(lat, lon);
  const { hourly, daily } = weatherData;
  displayWeather(weatherData, currCity, hourly, daily);

  toggleLoadding();
};

searchBtn.addEventListener("click", () => {
  footer.classList.toggle("footer-open");
  input.value = "";
});
weather();
