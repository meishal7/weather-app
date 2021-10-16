function initMap() {
  const options = {
    // componentRestrictions: { country: "us" },
    fields: ["geometry", "icon", "name"],
    strictBounds: false,
    types: ["(cities)"],
  };
  const input = document.getElementById("search-input");
  const autocomplete = new google.maps.places.Autocomplete(input, options);
  google.maps.event.addListener(autocomplete, "place_changed", (e) => {
    console.log(e);
    var place = autocomplete.getPlace();
    console.log(place);
    console.log({
      long: place.geometry.location.lng(),
      lat: place.geometry.location.lat(),
    });
  });
}
