export default function getDegree() {
  // Check default temp degree in storage
  const dataFromStorage = JSON.parse(localStorage.getItem("locations"));
  if (!dataFromStorage?.defaultDegree) return "\u00B0F";
  else if (dataFromStorage.defaultDegree === "\u00B0F") return "\u00B0F";
  else return "\u00B0C";
}
