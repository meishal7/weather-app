export default function localStor(weatherData, city) {
  const data = JSON.parse(localStorage.getItem("locations"));
  let savedLocTimeConv = new Date(weatherData.current.dt * 1000);
  let savedLocTimeArray = savedLocTimeConv.toLocaleTimeString().split(":");
  let savedLocTime =
    savedLocTimeArray[0] +
    "." +
    savedLocTimeArray[1] +
    savedLocTimeArray[2].charAt(3) +
    savedLocTimeArray[2].charAt(4);
  console.log(data);
  if (!data) {
    let obj = {
      name: city,
      temp: Math.floor(weatherData.current.temp),
      time: savedLocTime,
      lattitude: weatherData.lat,
      longtitude: weatherData.lon,
    };

    const locations = { cities: [] };
    locations.cities.push(obj);
    localStorage.setItem("locations", JSON.stringify(locations));
    return;
  } else if (data.cities.some((el) => el.name === city)) return;
  let obj = {
    name: city,
    temp: Math.floor(weatherData.current.temp),
    time: savedLocTime,
    lattitude: weatherData.lat,
    longtitude: weatherData.lon,
  };
  data.cities.push(obj);
  localStorage.setItem("locations", JSON.stringify(data));
}
