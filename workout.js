class Workout {
  #pos;
  #type;
  #distance;
  #duration;
  #date = new Date();
  #id = uuid.v4();

  constructor(pos, type, distance, duration) {
    this.#pos = pos;
    this.#type = type;
    this.#distance = distance;
    this.#duration = duration;
  }

  get pos() {
    return this.#pos;
  }

  get type() {
    return this.#type;
  }

  get date() {
    return this.#date;
  }

  get distance() {
    return this.#distance;
  }

  get duration() {
    return this.#duration;
  }

  get id() {
    return this.#id;
  }
}

class Running extends Workout {
  #cadence;
  constructor(pos, distance, duration, cadence) {
    super(pos, "running", distance, duration);
    this.#cadence = cadence;
  }

  get cadence() {
    return this.#cadence;
  }

  get pace() {
    return this.duration / this.distance;
  }
}

class Cycling extends Workout {
  #elevation;
  constructor(pos, distance, duration, elevation) {
    super(pos, "cycling", distance, duration);
    this.#elevation = elevation;
  }

  get elevation() {
    return this.#elevation;
  }

  get pace() {
    return (this.distance / this.duration) * 60;
  }
}
