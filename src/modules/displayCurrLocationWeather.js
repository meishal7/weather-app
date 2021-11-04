import { format } from "date-fns";
export default function displayCurrLocationWeather(
  weatherData,
  currCity,
  hourlyWeather,
  dailyWeather,
  degree
) {
  const city = document.querySelector(".curr-weather-city");
  const currTemp = document.querySelector(".curr-weather-temp");
  const currCond = document.querySelector(".curr-weather-condition");
  const currWeatherDiv = document.querySelector(".current-weather");
  const currWeatherMin = document.querySelector(".curr-weather-min");
  const currWeatherMax = document.querySelector(".curr-weather-max");
  const hourWeatherList = document.querySelector(".hour-weather-list");
  const weekWeatherList = document.querySelector(".week-weather-list");

  // Current weather
  // If degree == Fahrenheight display temp in fahr
  if (degree == "\u00B0F") {
    currTemp.textContent = Math.floor(weatherData.current.temp) + degree;
    currWeatherMin.textContent =
      Math.floor(weatherData.daily[0].temp.min) + degree;
    currWeatherMax.textContent =
      Math.floor(weatherData.daily[0].temp.max) + degree;
    // Otherwise display temp in celcius
  } else {
    currTemp.textContent =
      Math.floor(((weatherData.current.temp - 32) * 5) / 9) + "\u00B0C";
    currWeatherMin.textContent =
      Math.floor(((weatherData.daily[0].temp.min - 32) * 5) / 9) + "\u00B0C";
    currWeatherMax.textContent =
      Math.floor(((weatherData.daily[0].temp.max - 32) * 5) / 9) + "\u00B0C";
  }

  // Function for converting time to displayed location timezone time
  function convertTZ(date, tzString) {
    return new Date(
      (typeof date === "string" ? new Date(date) : date).toLocaleString(
        "en-US",
        { timeZone: tzString }
      )
    );
  }

  // Determine if it's day or night for correct background img
  const convertedDate = convertTZ(new Date(), weatherData.timezone);
  let currentWeatherDayTime = "";
  convertedDate.getHours() >= 6 && convertedDate.getHours() < 18
    ? (currentWeatherDayTime = "day")
    : (currentWeatherDayTime = "night");

  currWeatherDiv.style.backgroundImage = `url('/images/backgrounds/${currentWeatherDayTime}-${weatherData.current.weather[0].main}.png')`;

  currCond.textContent = weatherData.current.weather[0].main;
  city.textContent = currCity;

  // Hourly weather
  // Remove noodes for displaying the weather from saved location when
  // there is already displayed current weather, otherwise it would add new nodes
  while (hourWeatherList.firstChild && hourWeatherList.lastChild) {
    hourWeatherList.removeChild(hourWeatherList.firstChild);
  }

  hourlyWeather.forEach((hour) => {
    const hourLi = document.createElement("li");
    const time = document.createElement("p");
    const temp = document.createElement("p");
    temp.classList = "hour-temp";
    const hourImg = document.createElement("img");

    // Check if it's day or night for correct icon
    const date = new Date(hour.dt * 1000);
    const convertedDateHourWeather = convertTZ(date, weatherData.timezone);
    let hourDayTime = "";
    convertedDateHourWeather.getHours() >= 6 &&
    convertedDateHourWeather.getHours() < 18
      ? (hourDayTime = "day")
      : (hourDayTime = "night");

    time.innerText = format(convertedDateHourWeather, "ha");
    // If degree == Fahrenheight
    degree == "\u00B0F"
      ? (temp.innerText = `${Math.ceil(hour.temp)}` + degree)
      : (temp.innerText =
          `${Math.ceil(((hour.temp - 32) * 5) / 9)}` + "\u00B0C");

    hourImg.src = `./images/icons/${hourDayTime}-${hour.weather[0].main}.png`;
    hourImg.classList.add("hour-weather-img");
    hourLi.append(time, hourImg, temp);
    hourWeatherList.appendChild(hourLi);
  });

  // Week weather
  while (weekWeatherList.firstChild && weekWeatherList.lastChild) {
    weekWeatherList.removeChild(weekWeatherList.firstChild);
  }

  dailyWeather.forEach((day) => {
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

    // Get weekday
    const date = new Date(day.dt * 1000);
    const convertedDateWeekWeather = convertTZ(date, weatherData.timezone);
    let dayName = format(convertedDateWeekWeather, "EEEE");

    weekDayName.innerText = dayName;
    weekImgCond.src = `./images/icons/day-${day.weather[0].main}.png`;
    weekImgTempLow.src = `./images/icons/thermometer-low.png`;
    if (degree == "\u00B0F") {
      weekTempLow.innerText = `${Math.ceil(day.temp.min)}` + degree;
      weekTempHigh.innerText = `${Math.ceil(day.temp.max)}` + degree;
    } else {
      weekTempLow.innerText =
        `${Math.ceil(((day.temp.min - 32) * 5) / 9)}` + degree;
      weekTempHigh.innerText =
        `${Math.ceil(((day.temp.max - 32) * 5) / 9)}` + degree;
    }
    weekImgTempHigh.src = `./images/icons/thermometer-high.png`;
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

    weekWeatherList.appendChild(weekLi);
  });

  // Current weather details
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
  degree == "\u00B0F"
    ? (feelsLike.innerText =
        `${Math.ceil(weatherData.current.feels_like)}` + degree)
    : (feelsLike.innerText =
        `${Math.ceil(((weatherData.current.feels_like - 32) * 5) / 9)}` +
        "\u00B0C");

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
}
