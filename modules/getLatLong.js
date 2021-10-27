//export let coordinates;
export default async function getLatLong() {
  let coordinates = [];
  const response = await fetch("https://ipinfo.io/json?token=3631683ef9a03a");
  const json = await response.json();
  return (coordinates = [...json.loc.split(","), json.city]);
}
