export let locations = { cities: [] };

export default function localStor(locations, city) {
  if (locations.cities.length == 0) {
    locations.cities.push(city);
  } else {
    locations.cities.indexOf(city) === -1
      ? locations.cities.push(city)
      : console.log("This city already saved");
  }
  localStorage.setItem("locations", JSON.stringify(locations));
}
