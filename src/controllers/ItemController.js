import Model from '../models/ItemModel.js'
//import BatchQueue from './batchQueue.js';


export default class Controller {
  constructor () {
    this.batchQueue = new BatchQueue();
  }

  async set(data) {
    const { name, description, author, genre, publisher } = data;
    const newBook = new Model( name, description, author, genre, publisher );

    await this.batchQueue.add(newBook);
    console.log("new book insert in queue.")
  }

  async get() {
    return await this.batchQueue.queue.map(item => item.toDBObject());
  }
}
