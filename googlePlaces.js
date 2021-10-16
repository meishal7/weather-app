export default function initMap(input) {
  if (!input) return;
  const options = {
    // componentRestrictions: { country: "us" },
    fields: ["geometry", "icon", "name"],
    strictBounds: false,
    types: ["(cities)"],
  };
  const dropdown = new google.maps.places.Autocomplete(input, options);

  dropdown.addListener("place_changed", () => {
    const place = dropdown.getPlace();
    console.log(place.geometry.location.lat());
    console.log(place.geometry.location.lng());
  });

  input.addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  });
}
