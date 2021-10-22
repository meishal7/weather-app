// displaySavedLocations()
// This function goes through saved locations in local storage and displays
// city name, tempreture and time for every saved location in savedLocations div

import displayWeatherFromSavedLoc from "./displayWeatherFromSavedLoc";

const savedLocations = document.querySelector(".saved-locations");

export default function displaySavedLocations() {
  while (savedLocations.firstChild && savedLocations.lastChild) {
    savedLocations.removeChild(savedLocations.firstChild);
  }
  const data = JSON.parse(localStorage.getItem("locations"));
  if (!data) return;

  data.cities.forEach((el) => {
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
    savedLocTemp.textContent = el.temp + "\u00B0F";
    savedLocCard.style.backgroundImage = `url('/images/backgrounds/${el.dayTime}-${el.condition}.png')`;
    savedLocTime.innerText = el.time;

    savedLocCard.addEventListener("click", displayWeatherFromSavedLoc);
  });
}
