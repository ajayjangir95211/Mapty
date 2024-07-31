const message = document.querySelector(".portrait-message");
const container = document.querySelector(".container");
window.matchMedia("(orientation: portrait)").onchange = checkOrientation;

function isSmallScreen() {
  return window.screen.width < 768;
}

function checkOrientation() {
  if (isSmallScreen() && window.matchMedia("(orientation: portrait)").matches) {
    message.classList.remove("inactive");
    container.classList.add("inactive");
  } else {
    message.classList.add("inactive");
    container.classList.remove("inactive");
    navigator.geolocation.getCurrentPosition(
      (position) =>
        map.setView([position.coords.latitude, position.coords.longitude], 13),
      (err) => alert("Could not get your location")
    );
  }
}

checkOrientation();
