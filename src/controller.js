export default class Controller {
  constructor () {
    this.value = [];
  }

  get() {
    console.log(`${this.value} request`);
    return this.value;
  }

  set(value) {
    this.value = value;
    console.log(`${this.value} updated`);
  }
}
