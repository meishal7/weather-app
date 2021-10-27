import "regenerator-runtime/runtime"; // For solving error
import getLatLong, { coordinates } from "./modules/getLatLong";
import getWeather from "./modules/getWeather";
import displayCurrLocationWeather from "./modules/displayCurrLocationWeather";
import initMap from "./modules/googlePlaces";
import displaySavedLocations from "./modules/displaySavedLocations";
import setDegree from "./modules/setDegree";
import getDegree from "./modules/getDegree";
import storeLocations from "./modules/storeLocations";

const searchBtn = document.querySelector("#search-btn");
const footer = document.querySelector(".footer");
const input = document.querySelector("#search-input");
const celcBtn = document.querySelector("#celcius-btn");
const fahrBtn = document.querySelector("#fahr-btn");

const toggleLoadding = () =>
  document.querySelector(".spinner").classList.toggle("loading");

initMap(input);

const weather = async () => {
  toggleLoadding();
  let degree = getDegree();
  setDegree(degree);
  let coordinates = await getLatLong();
  let lat = coordinates[0];
  let lon = coordinates[1];
  let currCity = coordinates[2];
  const weatherData = await getWeather(lat, lon, degree);
  const { hourly, daily } = weatherData;
  displayCurrLocationWeather(weatherData, currCity, hourly, daily, degree);
  storeLocations(weatherData, currCity);
  displaySavedLocations();
  toggleLoadding();
};

searchBtn.addEventListener("click", () => {
  footer.classList.toggle("footer-open");
  input.value = "";
});
celcBtn.addEventListener("click", async () => {
  if (celcBtn.classList.contains("active-btn")) return;
  toggleLoadding();
  footer.classList.toggle("footer-open");
  setDegree("\u00B0C");
  let degree = getDegree();
  let coordinates = await getLatLong();
  let lat = coordinates[0];
  let lon = coordinates[1];
  let currCity = coordinates[2];
  const weatherData = await getWeather(lat, lon);
  const { hourly, daily } = weatherData;
  displayCurrLocationWeather(weatherData, currCity, hourly, daily, degree);
  storeLocations(weatherData, currCity);
  displaySavedLocations();
  toggleLoadding();
});
fahrBtn.addEventListener("click", async () => {
  if (fahrBtn.classList.contains("active-btn")) return;
  toggleLoadding();
  footer.classList.toggle("footer-open");
  setDegree("\u00B0F");
  let degree = getDegree();
  let coordinates = await getLatLong();
  let lat = coordinates[0];
  let lon = coordinates[1];
  let currCity = coordinates[2];
  const weatherData = await getWeather(lat, lon, degree);
  const { hourly, daily } = weatherData;
  displayCurrLocationWeather(weatherData, currCity, hourly, daily, degree);
  storeLocations(weatherData, currCity);
  displaySavedLocations();
  toggleLoadding();
});

weather();
