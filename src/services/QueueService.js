import redis from 'redis';
import Model from './model.js';
import { promisify } from 'util';

const redisClient = redis.createClient({
  host: 'redis',
  port: 6379
});

redisClient.on('connect', () => {
  console.log("Redis client connected");
});

redisClient.on('error', (err) => {
  console.error(`Redis client error: ${err}`);
})

const lpushAsync = promisify(redisClient.lPush).bind(redisClient);
const rpopAsync = promisify(redisClient.rPop).bind(redisClient);
const llenAsync = promisify(redisClient.lLen).bind(redisClient);

class QueueService {
  constructor() {
    this.maxBatchSize = 10;
  }

  async addItemToQueue(item) {
    try {
      const itemToQueue = JSON.stringify(item.toDBObject());
      await lpushAsync('queue', itemToQueue);
      const queueLength = await llenAsync('queue');
   
      if(queueLength >= this.maxBatchSize) {
        this.processQueue();
      }
    } catch (error) {
      console.error(`Error adding to queue: ${error}`);
    }
  }

  async processQueue() {
    try {
      const itemsToInsert = [];

      for (let i = 0; i < this.maxBatchSize; i++ ) {
        const item = await rpopAsync('queue');
        if (item) {
          itemsToInsert.push(JSON.parse(item));
        }
      }

      if (itemsToInsert.length > 0) {
        await Model.insertMany(itemsToInsert);
        console.log(`Inserted items in db: ${itemsToInsert}`);
      }
    } catch (error) {
      console.error(`Error on queue process: ${error}`);
    }
  }

  async flushQueue() {
    let item;
    const itemsToInsert = [];

    while ((item = await rpopAsync('queue')) !== null) {
      itemsToInsert.push(JSON.parse(item));
    }

    if (itemsToInsert.length > 0) {
      await Model.insertMany(itemsToInsert);
      console.log(`Inserted items in db (flush): ${itemsToInsert}`);
    }
  }
}

export default QueueService;
