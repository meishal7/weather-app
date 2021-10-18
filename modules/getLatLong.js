export let coordinates;
export default async function getLatLong() {
  const response = await fetch("https://ipinfo.io/json?token=3631683ef9a03a");
  const json = await response.json();
  //console.log(json);
  // coordinates = [...json.loc.split(","), json.city];
  // return coordinates;
  return (coordinates = [...json.loc.split(","), json.city]);
}
