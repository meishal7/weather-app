import "regenerator-runtime/runtime"; // For solving error
import getLatLong from "./modules/getLatLong";
import getWeather from "./modules/getWeather";
import displayCurrLocationWeather from "./modules/displayCurrLocationWeather";
import initMap from "./modules/googlePlaces";
import displaySavedLocations from "./modules/displaySavedLocations";
import setDegree from "./modules/setDegree";
import getDegree from "./modules/getDegree";
import storeLocations from "./modules/storeLocations";
import refreshSavedLocations from "./modules/resfreshSavedLocations";
import toggleFooterBody from "./modules/toggleFooterBody";

const searchBtn = document.querySelector("#search-btn");
const footer = document.querySelector(".footer");
const input = document.querySelector("#search-input");
const celcBtn = document.querySelector("#celcius-btn");
const fahrBtn = document.querySelector("#fahr-btn");
const body = document.querySelector("body");

const toggleLoadding = () =>
  document.querySelector(".loader").classList.toggle("loading");

initMap(input);

const weather = async () => {
  toggleLoadding();

  refreshSavedLocations();
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
  toggleFooterBody();
  input.value = "";
});

celcBtn.addEventListener("click", async () => {
  if (celcBtn.classList.contains("active-btn")) return;
  toggleLoadding();
  toggleFooterBody();
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
  toggleFooterBody();
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
let intervar;
document.querySelector("#move-right").addEventListener("mousedown", () => {
  const el = document.querySelector(".hour-weather-list");
  intervar = setInterval(() => {
    el.scrollLeft = el.scrollLeft - 100;
  }, 100);
});
document.querySelector("#move-right").addEventListener("mouseup", () => {
  clearInterval(intervar);
});

document.querySelector("#move-left").addEventListener("mousedown", () => {
  console.log("left");
  const el = document.querySelector(".hour-weather-list");
  intervar = setInterval(() => {
    el.scrollLeft = el.scrollLeft + 100;
  }, 100);
});
document.querySelector("#move-left").addEventListener("mouseup", () => {
  clearInterval(intervar);
});
