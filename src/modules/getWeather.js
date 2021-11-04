export default async function getWeather(lattitude, longtitude) {
  const apiKey = process.env.KEY;
  const weatherRes = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lattitude}&lon=${longtitude}&units=imperial&appid=${apiKey}`
  );
  const data = await weatherRes.json();
  console.log(data);
  return data;
}
