import displayWeatherFromSavedLoc from "./displayWeatherFromSavedLoc";

export default function displaySavedLocations() {
  const savedLocations = document.querySelector(".saved-locations");
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
    savedLocTemp.textContent = el.temp + data.defaultDegree;
    savedLocCard.style.backgroundImage = `url('/images/backgrounds/${el.dayTime}-${el.condition}.png')`;
    savedLocTime.innerText = el.time;

    savedLocCard.addEventListener("click", displayWeatherFromSavedLoc);
  });
}
