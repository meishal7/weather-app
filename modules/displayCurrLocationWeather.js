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
  const footer = document.querySelector(".footer");

  // Current weather
  city.textContent = currCity;
  // If degree == Fahrenheight
  if (degree == "\u00B0F") {
    currTemp.textContent = Math.floor(weatherData.current.temp) + degree;
    currWeatherMin.textContent =
      Math.floor(weatherData.daily[0].temp.min) + degree;
    currWeatherMax.textContent =
      Math.floor(weatherData.daily[0].temp.max) + degree;
  } else {
    currTemp.textContent =
      Math.floor(((weatherData.current.temp - 32) * 5) / 9) + "\u00B0C";
    currWeatherMin.textContent =
      Math.floor(((weatherData.daily[0].temp.min - 32) * 5) / 9) + "\u00B0C";
    currWeatherMax.textContent =
      Math.floor(((weatherData.daily[0].temp.max - 32) * 5) / 9) + "\u00B0C";
  }
  currCond.textContent = weatherData.current.weather[0].main;

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
    currWeatherDiv.style.backgroundImage = `url('/images/backgrounds/${currentWeatherDayTime}-${weatherData.current.weather[0].main}.png')`;
  } else if (weatherData.current.dt < weatherData.current.sunrise) {
    currentWeatherDayTime = "night";
    currWeatherDiv.style.backgroundImage = `url('/images/backgrounds/${currentWeatherDayTime}-${weatherData.current.weather[0].main}.png')`;
  }

  // Hourly weather
  // Remove noodes for displaying the weather from saved location when
  // there is already displayed current weather, otherwise it would add new nodes
  while (hourWeatherList.firstChild && hourWeatherList.lastChild) {
    hourWeatherList.removeChild(hourWeatherList.firstChild);
  }

  hourlyWeather.forEach((hour) => {
    const date = new Date(hour.dt * 1000);
    const hourLi = document.createElement("li");
    const time = document.createElement("p");
    const temp = document.createElement("p");
    temp.classList = "hour-temp";
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
