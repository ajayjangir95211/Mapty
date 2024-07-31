const map = L.map("map").setView([0, 0], 13);
let mapEvent = null;
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);



const form = document.querySelector("#form");

form.querySelector("select").addEventListener("change", (e) => {
  if (e.target.value === "running") {
    form
      .querySelector("#cadence")
      .closest(".form-control")
      .classList.remove("hidden");
    form
      .querySelector("#elevation")
      .closest(".form-control")
      .classList.add("hidden");
  } else if (e.target.value === "cycling") {
    form
      .querySelector("#cadence")
      .closest(".form-control")
      .classList.add("hidden");
    form
      .querySelector("#elevation")
      .closest(".form-control")
      .classList.remove("hidden");
  }
});

form.querySelector("button.submit").addEventListener("click", (e) => {
  e.preventDefault();
  const type = document.querySelector("#type").value;
  const distance = document.querySelector("#distance").value;
  const duration = document.querySelector("#duration").value;
  const cadence = document.querySelector("#cadence").value;
  const elevation = document.querySelector("#elevation").value;

  console.log(type, distance, duration, cadence, elevation);

  let newWorkout;
  if (type === "running" && +distance > 0 && +duration > 0 && +cadence > 0)
    newWorkout = new Running(mapEvent.latlng, +distance, +duration, +cadence);
  else if (
    type === "cycling" &&
    +distance > 0 &&
    +duration > 0 &&
    +elevation > 0
  )
    newWorkout = new Cycling(mapEvent.latlng, +distance, +duration, +elevation);
  else
    alert("Please enter valid data (negative or zero values are not allowed)!");

  newWorkout ? workouts.updateWorkout(newWorkout) : null;
  form.reset();
  form.classList.add("hidden");
  marker.remove();
});

form.querySelector("button.close").addEventListener("click", (e) => {
  e.preventDefault();
  form.classList.add("hidden");
  marker.remove();
});

let marker;
map.on("click", (mapE) => {
  marker?.remove();
  marker = L.marker(mapE.latlng).addTo(map).bindPopup("Workout").openPopup();
  form.classList.remove("hidden");
  mapEvent = mapE;
});

const dateFormatter = Intl.DateTimeFormat(navigator.language, {
  month: "long",
  day: "numeric",
});

const workouts = {
  list: [],
  updateWorkout(workout) {
    this.list.push(workout);

    L.marker([workout.pos.lat, workout.pos.lng])
      .addTo(map)
      .bindPopup(
        `${
          workout.type.slice(0, 1).toUpperCase() + workout.type.slice(1)
        } on ${dateFormatter.format(workout.date)}`,
        {
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        }
      )
      .openPopup();

    const temp = document.createElement("div");
    temp.innerHTML = `
    <li class="workout workout--${workout.type}" data-id="${workout.id}">
      <h3 class="workout__title">${
        workout.type.slice(0, 1).toUpperCase() + workout.type.slice(1)
      } on ${dateFormatter.format(workout.date)}</h3>

      <div class="workout__details__container">
      <div class="workout__details">
        <span class="workout__icon">${
          workout.type === "running" ? "🏃‍♂️" : "🚴‍♀️"
        }</span>
        <span class="workout__value">${workout.distance}</span>
        <span class="workout__unit">km</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">⏱</span>
        <span class="workout__value">${workout.duration}</span>
        <span class="workout__unit">min</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">⚡️</span>
        <span class="workout__value">${workout.pace.toFixed(1)}</span>
        <span class="workout__unit">${
          workout.type === "running" ? "min/km" : "km/h"
        }</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">${
          workout.type === "running" ? "🦶🏼" : "⛰"
        }</span>
        <span class="workout__value">${
          workout.type === "running" ? workout.cadence : workout.elevation
        }</span>
        <span class="workout__unit">${
          workout.type === "running" ? "spm" : "m"
        }</span>
      </div>
      </div>
    </li>`;
    console.log(temp);
    const workoutElement = temp.firstElementChild;

    workoutElement.addEventListener("click", (e) => {
      map.setView([workout.pos.lat, workout.pos.lng], 13);
    });

    document
      .querySelector(".workouts")
      .insertAdjacentElement("afterbegin", workoutElement);
  },
};
