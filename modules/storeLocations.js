export default function storeLocations(weatherData, city) {
  const data = JSON.parse(localStorage.getItem("locations"));
  // Convert time from EPOC to normal time
  let savedLocTimeConv = new Date(weatherData.current.dt * 1000);
  let savedLocTimeArray = savedLocTimeConv.toLocaleTimeString().split(":");
  let savedLocTime =
    savedLocTimeArray[0] +
    "." +
    savedLocTimeArray[1] +
    savedLocTimeArray[2].charAt(3) +
    savedLocTimeArray[2].charAt(4);
  // Determine if it's day or night
  let dayTime = "";
  if (
    weatherData.current.dt > weatherData.current.sunrise &&
    weatherData.current.dt < weatherData.current.sunset
  ) {
    dayTime = "day";
  } else if (
    weatherData.current.dt > weatherData.current.sunrise &&
    weatherData.current.dt > weatherData.current.sunset
  ) {
    dayTime = "night";
  } else if (weatherData.current.dt < weatherData.current.sunrise) {
    dayTime = "night";
  }
  // If there is no saved cities
  if (data.cities.length == 0) {
    let obj = {
      name: city,
      temp: Math.floor(weatherData.current.temp),
      time: savedLocTime,
      lattitude: weatherData.lat,
      longtitude: weatherData.lon,
      condition: weatherData.current.weather[0].main,
      dayTime: dayTime,
    };

    //const locations = { defaultDegree: defaultDegree, cities: [] };
    data.cities.push(obj);
    localStorage.setItem("locations", JSON.stringify(data));
    return;
  }
  if (data.cities.some((el) => el.name === city)) return;

  let obj1 = {
    name: city,
    temp: Math.floor(weatherData.current.temp),
    time: savedLocTime,
    lattitude: weatherData.lat,
    longtitude: weatherData.lon,
    condition: weatherData.current.weather[0].main,
    dayTime: dayTime,
  };
  data.cities.push(obj1);
  localStorage.setItem("locations", JSON.stringify(data));
}

// else if (data.cities.some((el) => el.name === city)) {
//   if (data.defaultDegree == defaultDegree) return;
//   data.defaultDegree = defaultDegree;
//   data.cities.forEach(async (el) => {
//     const weatherData = await getWeather(
//       el.lattitude,
//       el.longtitude,
//       defaultDegree
//     );
//     // Convert EPOC time to normal time
//     let savedLocTimeConv = new Date(weatherData.current.dt * 1000);
//     let savedLocTimeArray = savedLocTimeConv.toLocaleTimeString().split(":");
//     let savedLocTime =
//       savedLocTimeArray[0] +
//       "." +
//       savedLocTimeArray[1] +
//       savedLocTimeArray[2].charAt(3) +
//       savedLocTimeArray[2].charAt(4);
//     // Determine if it's day or night for choosing background image
//     let dayTime = "";
//     if (
//       weatherData.current.dt > weatherData.current.sunrise &&
//       weatherData.current.dt < weatherData.current.sunset
//     ) {
//       dayTime = "day";
//     } else if (
//       weatherData.current.dt > weatherData.current.sunrise &&
//       weatherData.current.dt > weatherData.current.sunset
//     ) {
//       dayTime = "night";
//     } else if (weatherData.current.dt < weatherData.current.sunrise) {
//       dayTime = "night";
//     }
//     el.temp = Math.floor(weatherData.current.temp);
//     (el.time = savedLocTime),
//       (el.condition = weatherData.current.weather[0].main),
//       (el.dayTime = dayTime);
//     localStorage.setItem("locations", JSON.stringify(data));
//   });

//   //displaySavedLocations();
// } else {
//   let obj1 = {
//     name: city,
//     temp: Math.floor(weatherData.current.temp),
//     time: savedLocTime,
//     lattitude: weatherData.lat,
//     longtitude: weatherData.lon,
//     condition: weatherData.current.weather[0].main,
//     dayTime: dayTime,
//   };
//   data.cities.push(obj1);
//   data.defaultDegree = defaultDegree;
//   localStorage.setItem("locations", JSON.stringify(data));
// }
