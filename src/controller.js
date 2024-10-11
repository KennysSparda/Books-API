import Model from './model.js';
import BatchQueue from './batchQueue.js';

const batchQueue = new BatchQueue();

export default class Controller {
  constructor () {

  }

  set(data) {
    const { name, description, author, genre, publisher } = data;
    const newBook = new Model( name, description, author, genre, publisher );

    batchQueue.add(newBook);
    console.log("new book insert in queue.")
  }

  get() {
    return batchQueue.queue.map(item => item.toDBObject());
  }
}
