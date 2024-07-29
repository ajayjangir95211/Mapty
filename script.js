const map = L.map("map").setView([0, 0], 13);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

navigator.geolocation.getCurrentPosition(
  (position) =>
    map.setView([position.coords.latitude, position.coords.longitude], 13),
  (err) => alert("Could not get your location")
);


