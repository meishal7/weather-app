export default function setDegree(degree) {
  const celcBtn = document.querySelector("#celcius-btn");
  const fahrBtn = document.querySelector("#fahr-btn");
  const data = JSON.parse(localStorage.getItem("locations"));

  // Highlighting degree buttons
  if (degree == "\u00B0C") {
    fahrBtn.classList.remove("active-btn");
    celcBtn.classList.add("active-btn");
  } else {
    fahrBtn.classList.add("active-btn");
    celcBtn.classList.remove("active-btn");
  }
  if (!data) {
    const locations = { defaultDegree: degree, cities: [] };
    localStorage.setItem("locations", JSON.stringify(locations));
    fahrBtn.classList.add("active-btn");
    return;
  }
  data.defaultDegree = degree;
  localStorage.setItem("locations", JSON.stringify(data));
}
