import displayWeatherFromSavedLoc from "./displayWeatherFromSavedLoc";
import { format } from "date-fns";

export default function displaySavedLocations() {
  const savedLocations = document.querySelector(".saved-locations");
  const child = document.querySelector(".saved-loc-card");
  while (savedLocations.firstChild && savedLocations.lastChild) {
    child.removeEventListener("click", displayWeatherFromSavedLoc);
    savedLocations.removeChild(savedLocations.firstChild);
  }
  const data = JSON.parse(localStorage.getItem("locations"));
  if (!data) return;

  data.cities.forEach((el) => {
    function convertTZ(date, tzString) {
      return new Date(
        (typeof date === "string" ? new Date(date) : date).toLocaleString(
          "en-US",
          { timeZone: tzString }
        )
      );
    }
    let dayTime = "";
    const convertedDate = convertTZ(new Date(), el.timezone);
    convertedDate.getHours() >= 6 && convertedDate.getHours() < 18
      ? (dayTime = "day")
      : (dayTime = "night");
    const formattedTime = format(convertedDate, "hh:mma");
    const savedLocCard = document.createElement("div");
    savedLocCard.className = "saved-loc-card";
    const savedLocInnerDiv = document.createElement("div");
    const savedLocName = document.createElement("p");
    savedLocName.classList = "saved-loc-name";
    const savedLocTemp = document.createElement("p");
    savedLocTemp.classList = "saved-loc-temp";
    const savedLocTime = document.createElement("p");
    savedLocTime.className = "saved-loc-time";
    savedLocInnerDiv.append(savedLocName, savedLocTemp);
    savedLocCard.append(savedLocTime, savedLocInnerDiv);
    savedLocations.appendChild(savedLocCard);
    savedLocName.textContent = el.name;
    data.defaultDegree == "\u00B0F"
      ? (savedLocTemp.textContent = el.temp + data.defaultDegree)
      : (savedLocTemp.textContent =
          Math.floor(((el.temp - 32) * 5) / 9) + "\u00B0C");
    savedLocCard.style.backgroundImage = `url('/images/backgrounds/${dayTime}-${el.condition}.png')`;
    savedLocTime.innerText = formattedTime;

    savedLocCard.addEventListener("click", displayWeatherFromSavedLoc);
  });
}
