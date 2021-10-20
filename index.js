import "regenerator-runtime/runtime"; // For solving error
import getLatLong, { coordinates } from "./modules/getLatLong";
import getWeather from "./modules/getWeather";
import displayWeather from "./modules/displayWeather";
import initMap from "./modules/googlePlaces";
import reloadSavedLocations from "./modules/reloadSavedLocations";
import displaySavedLocations from "./modules/displaySavedLocations";
import switchCelcius from "./modules/switchCelcius";

const searchBtn = document.querySelector("#search-btn");
const footer = document.querySelector(".footer");
const input = document.querySelector("#search-input");
const savedLoc = document.querySelector(".saved-locations");
const celcBtn = document.querySelector("#celcius-btn");
const fahrBtn = document.querySelector("#fahr-btn");

const toggleLoadding = () =>
  document.querySelector(".spinner").classList.toggle("loading");

initMap(input);
reloadSavedLocations();
const weather = async () => {
  toggleLoadding();
  await getLatLong();
  let lat = coordinates[0];
  let lon = coordinates[1];
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
celcBtn.addEventListener("click", () => {
  console.log("celc clicked");
  switchCelcius();
});
fahrBtn.addEventListener("click", () => {
  console.log("fahr clicked");
});

// console.log("here is ", savedLoc);
// savedLoc.addEventListener("click", (event) => {
//   console.log("i am clicked", event.target);
// });
weather();
