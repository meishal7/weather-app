const apiKey = process.env.KEY;

export default async function getWeather(lattitude, longtitude, degree) {
  if (degree == "\u00B0F") {
    const weatherRes = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lattitude}&lon=${longtitude}&units=imperial&appid=${apiKey}`
    );
    const data = await weatherRes.json();
    return data;
  } else {
    const weatherRes = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lattitude}&lon=${longtitude}&units=metric&appid=${apiKey}`
    );
    const data = await weatherRes.json();
    return data;
  }
}
