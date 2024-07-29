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
}

class Running extends Workout {
  #cadence;
  constructor(pos, distance, duration, cadence) {
    super(pos, "running", distance, duration);
    this.#cadence = cadence;
  }
}

class Cycling extends Workout {
  #elevation;
  constructor(pos, distance, duration, elevation) {
    super(pos, "cycling", distance, duration);
    this.#elevation = elevation;
  }
}
