import getWeather from "./getWeather";
import displayWeather from "./displayWeather";
import removeNodes from "./removeNodes";

const footer = document.querySelector(".footer");
export default function initMap(input) {
  if (!input) return;
  const options = {
    // componentRestrictions: { country: "us" },
    fields: ["geometry", "icon", "name", "place_id"],
    strictBounds: false,
    types: ["(cities)"],
  };
  const dropdown = new google.maps.places.Autocomplete(input, options);

  dropdown.addListener("place_changed", () => {
    const place = dropdown.getPlace();

    console.log(place);
    console.log(place.geometry.location.lat());
    console.log(place.geometry.location.lng());

    const weather = async () => {
      let weatherData = await getWeather(
        place.geometry.location.lat(),
        place.geometry.location.lng()
      );
      let city = place.name;
      const { hourly, daily } = weatherData;
      removeNodes();
      displayWeather(weatherData, city, hourly, daily);
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
