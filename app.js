// Vars
let lat;
let lon;
//let dateTime = "day";
//let cond = "clear";

const apiKey = "890c296cdc63122d337e770ba14c5c48";

// DOM
const city = document.querySelector(".curr-weather-city");
const currTemp = document.querySelector(".curr-weather-temp");
const currCond = document.querySelector(".curr-weather-condition");
const hourWeatherList = document.querySelector(".hour-weather-list");
const currWeatherDiv = document.querySelector(".current-weather");
const currWeatherMin = document.querySelector(".curr-weather-min");
const currWeatherMax = document.querySelector(".curr-weather-max");

const toggleLoadding = () =>
  document.querySelector(".spinner").classList.toggle("loading");

// Get lattitide and longtitude
async function getCrd() {
  const response = await fetch("https://ipinfo.io/json?token=3631683ef9a03a");
  const json = await response.json();
  return [...json.loc.split(","), json.city];
}

async function getWeather(lat, lon) {
  const weatherRes = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
  );
  const data = await weatherRes.json();
  console.log(data);
  return data;
}

const displayWeather = async () => {
  toggleLoadding();

  const [lat, lon, currCity] = await getCrd();
  const weatherData = await getWeather(lat, lon);
  const { hourly } = weatherData;

  // Display current weather
  city.textContent = currCity;
  currTemp.textContent = Math.floor(weatherData.current.temp) + "\u00B0F";
  currCond.textContent = weatherData.current.weather[0].main;
  currWeatherMin.textContent =
    /**"\u2193" +*/ Math.floor(weatherData.daily[0].temp.min) + "\u00B0F";
  currWeatherMax.textContent =
    /**"\u2191" +*/ Math.floor(weatherData.daily[0].temp.max) + "\u00B0F";
  // Determine if it's day or night and display background
  let dayTime = "";
  if (
    weatherData.current.dt > weatherData.current.sunrise &&
    weatherData.current.dt < weatherData.current.sunset
  ) {
    dayTime = "day";
    currWeatherDiv.style.backgroundImage = `url('/images/backgrounds/${dayTime}-${weatherData.current.weather[0].main}.png')`;
  } else if (
    weatherData.current.dt > weatherData.current.sunrise &&
    weatherData.current.dt > weatherData.current.sunset
  ) {
    dayTime = "night";
    console.log(weatherData.current.weather.main);
    currWeatherDiv.style.backgroundImage = `url('/images/backgrounds/${dayTime}-${weatherData.current.weather[0].main}.png')`;
  } else if (weatherData.current.dt < weatherData.current.sunrise) {
    dayTime = "night";
    currWeatherDiv.style.backgroundImage = `url('/images/backgrounds/${dayTime}-${weatherData.current.weather[0].main}.png')`;
  }

  // Display hourly weather
  hourly.forEach((day) => {
    const date = new Date(day.dt * 1000);

    const hourLi = document.createElement("li");
    const time = document.createElement("p");
    const temp = document.createElement("p");
    const hourImg = document.createElement("img");
    // Convert EPOCH seconds to local time and split resullting string into array
    // for using only needed parts of that string in html element
    let timeArray = date.toLocaleTimeString().split(":");

    // Display only time first digit and am/pm letters
    time.innerText =
      timeArray[0] + timeArray[2].charAt(3) + timeArray[2].charAt(4);

    temp.innerText = `${Math.ceil(day.temp)}\u00B0F`; // Round tempreture
    //hourImg.src = `./images/icons/${dayTime}-${day.weather[0].main}.svg`;
    hourImg.src = "./images/icons/new.png";
    hourImg.classList.add("hour-weather-img");
    hourLi.appendChild(time);
    hourLi.appendChild(hourImg);
    hourLi.appendChild(temp);
    hourWeatherList.appendChild(hourLi);
  });

  toggleLoadding();
};

displayWeather();
