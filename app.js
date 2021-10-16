// Vars
let lat;
let lon;
//let dateTime = "day";
//let cond = "clear";
function boo() {
  console.log("boo");
}
const apiKey = process.env.KEY;
console.log(apiKey);

// DOM
const city = document.querySelector(".curr-weather-city");
const currTemp = document.querySelector(".curr-weather-temp");
const currCond = document.querySelector(".curr-weather-condition");
const hourWeatherList = document.querySelector(".hour-weather-list");
const currWeatherDiv = document.querySelector(".current-weather");
const currWeatherMin = document.querySelector(".curr-weather-min");
const currWeatherMax = document.querySelector(".curr-weather-max");
const searchBtn = document.querySelector("#search-btn");
const footer = document.querySelector(".footer");

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
  //console.log(data);
  return data;
}

const displayWeather = async (lat, lon) => {
  toggleLoadding();
  let latitude;
  let longtitude;
  let currCity;
  if (!lat && !lon) {
    const [lat, lon, currCitym] = await getCrd();
    latitude = lat;
    longtitude = lon;
    currCity = currCitym;
  } else {
    const currCitym = await getCrd();
    currCity = currCitym[3];
    latitude = lat;
    longtitude = lon;
    console.log("boo");
    console.log(currCity);
  }

  const weatherData = await getWeather(latitude, longtitude);
  console.log(weatherData);
  const { hourly, daily } = weatherData;

  // Display current weather
  city.textContent = currCity;
  currTemp.textContent = Math.floor(weatherData.current.temp) + "\u00B0F";
  currCond.textContent = weatherData.current.weather[0].main;
  currWeatherMin.textContent =
    /**"\u2193" +*/ Math.floor(weatherData.daily[0].temp.min) + "\u00B0F";
  currWeatherMax.textContent =
    /**"\u2191" +*/ Math.floor(weatherData.daily[0].temp.max) + "\u00B0F";
  // Determine if it's day or night and display background
  let currentWeatherDayTime = "";
  if (
    weatherData.current.dt > weatherData.current.sunrise &&
    weatherData.current.dt < weatherData.current.sunset
  ) {
    currentWeatherDayTime = "day";
    currWeatherDiv.style.backgroundImage = `url('/images/backgrounds/${currentWeatherDayTime}-${weatherData.current.weather[0].main}.png')`;
  } else if (
    weatherData.current.dt > weatherData.current.sunrise &&
    weatherData.current.dt > weatherData.current.sunset
  ) {
    currentWeatherDayTime = "night";
    //console.log(weatherData.current.weather.main);
    currWeatherDiv.style.backgroundImage = `url('/images/backgrounds/${currentWeatherDayTime}-${weatherData.current.weather[0].main}.png')`;
  } else if (weatherData.current.dt < weatherData.current.sunrise) {
    currentWeatherDayTime = "night";
    currWeatherDiv.style.backgroundImage = `url('/images/backgrounds/${currentWeatherDayTime}-${weatherData.current.weather[0].main}.png')`;
  }

  // Display hourly weather
  hourly.forEach((hour) => {
    const date = new Date(hour.dt * 1000);

    const hourLi = document.createElement("li");
    const time = document.createElement("p");
    const temp = document.createElement("p");
    const hourImg = document.createElement("img");
    // Convert EPOCH seconds to local time and split resullting string into array
    // for using only needed parts of that string in html element
    let timeArray = date.toLocaleTimeString().split(":");
    // Check if it's day or night
    let hourDayTime = "";
    if (
      timeArray[2].charAt(3) == "A" &&
      timeArray[0] >= 6 &&
      timeArray[0] <= 11
    ) {
      hourDayTime = "day";
    } else if (timeArray[2].charAt(3) == "P" && timeArray[0] == 12) {
      hourDayTime = "day";
    } else if (
      timeArray[2].charAt(3) == "P" &&
      timeArray[0] >= 1 &&
      timeArray[0] <= 5
    ) {
      hourDayTime = "day";
    } else if (
      timeArray[2].charAt(3) == "P" &&
      timeArray[0] > 5 &&
      timeArray[0] <= 11
    ) {
      hourDayTime = "night";
    } else if (timeArray[2].charAt(3) == "A" && timeArray[0] == 12) {
      hourDayTime = "night";
    } else if (
      timeArray[2].charAt(3) == "A" &&
      timeArray[0] >= 1 &&
      timeArray[0] < 6
    ) {
      hourDayTime = "night";
    }
    // Display only time first digit and am/pm letters
    time.innerText =
      timeArray[0] + timeArray[2].charAt(3) + timeArray[2].charAt(4);
    temp.innerText = `${Math.ceil(hour.temp)}\u00B0F`; // Round tempreture
    hourImg.src = `./images/icons/${hourDayTime}-${hour.weather[0].main}.png`;
    hourImg.classList.add("hour-weather-img");
    hourLi.append(time, hourImg, temp);
    hourWeatherList.appendChild(hourLi);
  });

  // Display weekly weather
  daily.forEach((day) => {
    const weekLi = document.createElement("li");
    const weekDayName = document.createElement("p");
    const weekImgCondDiv = document.createElement("div");
    const weekImgCond = document.createElement("img");
    const weekLowTempDiv = document.createElement("div");
    const weekImgTempLow = document.createElement("img");
    const weekTempLow = document.createElement("p");
    const weekHighTempDiv = document.createElement("div");
    const weekImgTempHigh = document.createElement("img");
    const weekTempHigh = document.createElement("p");
    const weekHumidityDiv = document.createElement("div");
    const weekImgHumidity = document.createElement("img");
    const weekHumidity = document.createElement("p");

    const weekDate = new Date(day.dt * 1000);
    let dayName = "";
    switch (weekDate.getUTCDay()) {
      case 0:
        dayName = "Sunday";
        break;
      case 1:
        dayName = "Monday";
        break;
      case 2:
        dayName = "Tuesday";
        break;
      case 3:
        dayName = "Wednesday";
        break;
      case 4:
        dayName = "Thursday";
        break;
      case 5:
        dayName = "Friday";
        break;
      case 6:
        dayName = "Saturday";
        break;
    }

    weekDayName.innerText = dayName;
    weekImgCond.src = `./images/icons/day-${day.weather[0].main}.png`;
    weekImgTempLow.src = `./images/icons/thermometer-low.png`;
    weekTempLow.innerText = `${Math.ceil(day.temp.min)}\u00B0F`;
    weekImgTempHigh.src = `./images/icons/thermometer-high.png`;
    weekTempHigh.innerText = `${Math.ceil(day.temp.max)}\u00B0F`;
    weekImgHumidity.src = `./images/icons/drop.png`;
    weekHumidity.innerText = day.humidity + `\u0025`;

    weekImgCondDiv.appendChild(weekImgCond);
    weekLowTempDiv.append(weekImgTempLow, weekTempLow);
    weekHighTempDiv.append(weekImgTempHigh, weekTempHigh);
    weekHumidityDiv.append(weekImgHumidity, weekHumidity);

    weekLi.append(
      weekDayName,
      weekImgCondDiv,
      weekLowTempDiv,
      weekHighTempDiv,
      weekHumidityDiv
    );

    const weekWeatherList = document.querySelector(".week-weather-list");
    weekWeatherList.appendChild(weekLi);
  });

  // Display current weather details
  // Sunrise
  const sunriseTime = new Date(weatherData.current.sunrise * 1000);
  let sunriseTimeArray = sunriseTime.toLocaleTimeString().split(":");
  const sunrise = document.querySelector(".sunrise-value");
  sunrise.innerText =
    sunriseTimeArray[0] +
    "." +
    sunriseTimeArray[1] +
    sunriseTimeArray[2].charAt(3) +
    sunriseTimeArray[2].charAt(4);

  //Sunset
  const sunsetTime = new Date(weatherData.current.sunset * 1000);
  let sunsetTimeArray = sunsetTime.toLocaleTimeString().split(":");
  const sunset = document.querySelector(".sunset-value");
  sunset.innerText =
    sunsetTimeArray[0] +
    "." +
    sunsetTimeArray[1] +
    sunsetTimeArray[2].charAt(3) +
    sunsetTimeArray[2].charAt(4);

  // Humidity
  const humidity = document.querySelector(".humidity-value");
  humidity.innerText = weatherData.current.humidity + `\u0025`;
  // Feels like
  const feelsLike = document.querySelector(".feels-like-value");
  feelsLike.innerText = `${Math.ceil(weatherData.current.feels_like)}\u00B0F`;
  // Pressure
  let pressureConverted = weatherData.current.pressure / 33.86;
  const pressure = document.querySelector(".pressure-value");
  pressure.innerText = pressureConverted.toFixed(2) + " inHg";
  // Wind
  let windDirection = "";
  if (weatherData.current.wind_dig >= 0 && weatherData.current.wind_dig <= 90) {
    windDirection = "ene";
  } else if (
    weatherData.current.wind_dig > 90 &&
    weatherData.current.wind_dig < 180
  ) {
    windDirection = "ese";
  } else if (
    weatherData.current.wind_dig > 180 &&
    weatherData.current.wind_dig < 270
  ) {
    windDirection = "wsw";
  } else {
    windDirection = "wnw";
  }
  const wind = document.querySelector(".wind-value");
  wind.innerText =
    windDirection + " " + weatherData.current.wind_speed + " mph";

  toggleLoadding();
};

displayWeather();

searchBtn.addEventListener("click", () =>
  footer.classList.toggle("footer-open")
);

export default function test() {
  return "test";
}
