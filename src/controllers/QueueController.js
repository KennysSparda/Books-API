import  QueueService from '../services/QueueService.js'

const queueService = new QueueService();

export const addToQueue = async (request, response) => {
  try {
    const item = request.body;
    await queueService.addItemToQueue(item);
    response.status(200).send({ message: "Item added to queue" });
  } catch (error) {
    response.status(500).send({ message: "Error adding to queue", error });
  }
};

export const flushQueue = async (request, response) => {
  try {
    await queueService.flushQueue();
    response.status(200).send({ message: "Queue flushed successfully" });
  } catch (error) {
    response.status(500).send({ message: "Error flushing queue ", error});
  }
};

