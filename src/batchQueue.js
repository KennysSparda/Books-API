import Model from './model.js';

export default class BatchQueue {
  constructor() {
    this.queue = [];
    this.maxBatchSize = 10;
  }

  add(item) {
    this.queue.push(item);
    if(this.queue.length >= this.maxBatchSize) {
      this.processQueue();
    }
  }

  async processQueue() {
    if ( this.queue.length > 0 ) {
      try {
        const itemsToInsert = this.queue.map(item => item.toDBObject());
        await Model.insertMany(itemsToInsert);
        console.log(`Inserted itens in db: ${itemsToInsert}`);
        this.queue = [];
      } catch (error) {
        console.error(`Error on queue process: ${error}`);
      }
    }
  }

  flushQueue() {
    this.processQueue();
  }
}

