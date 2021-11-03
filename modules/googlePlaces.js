import getWeather from "./getWeather";
import displayCurrLocationWeather from "./displayCurrLocationWeather";
import getDegree from "./getDegree";
import displaySavedLocations from "./displaySavedLocations";
import storeLocations from "./storeLocations";

export default function initMap(input) {
  const hourWeatherList = document.querySelector(".hour-weather-list");
  const weekWeatherList = document.querySelector(".week-weather-list");
  const footer = document.querySelector(".footer");
  let degree = getDegree();
  if (!input) return;
  const options = {
    fields: ["geometry", "icon", "name", "place_id"],
    strictBounds: false,
    types: ["(cities)"],
  };
  const dropdown = new google.maps.places.Autocomplete(input, options);

  dropdown.addListener("place_changed", () => {
    const place = dropdown.getPlace();
    const weather = async () => {
      let weatherData = await getWeather(
        place.geometry.location.lat(),
        place.geometry.location.lng()
      );
      let city = place.name;
      const { hourly, daily } = weatherData;

      while (hourWeatherList.firstChild && hourWeatherList.lastChild) {
        hourWeatherList.removeChild(hourWeatherList.firstChild);
      }
      while (weekWeatherList.firstChild && weekWeatherList.lastChild) {
        weekWeatherList.removeChild(weekWeatherList.firstChild);
      }
      displayCurrLocationWeather(weatherData, city, hourly, daily, degree);
      storeLocations(weatherData, city);
      displaySavedLocations();
    };
    weather();
    footer.classList.toggle("footer-open");
  });

  input.addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  });
}
