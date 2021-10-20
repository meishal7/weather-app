const savedLocations = document.querySelector(".saved-locations");
export default function displaySavedLocations() {
  const data = JSON.parse(localStorage.getItem("locations"));
  if (!data) return;
  console.log("there is data");
  let city = localStorage.getItem()
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
    savedLocCard.style.backgroundImage = `url('/images/backgrounds/${currentWeatherDayTime}-${weatherData.current.weather[0].main}.png')`;
  });
}
