const kafka = require('kafka-node');
const { handleDeviceCreated, handleDeviceUpdated, handleDeviceDeleted } = require('./deviceService');

const kafkaHost = 'broker.smarthome.com:9092';
let producer;
let consumer;

const initKafkaProducer = () => {
  return new Promise((resolve, reject) => {
    const client = new kafka.KafkaClient({ kafkaHost });
    producer = new kafka.Producer(client);

    producer.on('ready', () => {
      console.log('Kafka Producer is connected and ready.');
      resolve();
    });

    producer.on('error', (error) => {
      console.error('Error in Kafka Producer', error);
      reject(error);
    });
  });
};

const initKafkaConsumer = () => {
  return new Promise((resolve, reject) => {
    const client = new kafka.KafkaClient({ kafkaHost });
    const topics = [
      { topic: 'device/created' },
      { topic: 'device/updated' },
      { topic: 'device/deleted' },
    ];

    consumer = new kafka.Consumer(client, topics, { autoCommit: true });

    consumer.on('message', (message) => {
      const parsedMessage = JSON.parse(message.value);
      switch (message.topic) {
        case 'device/created':
          handleDeviceCreated(parsedMessage);
          break;
        case 'device/updated':
          handleDeviceUpdated(parsedMessage);
          break;
        case 'device/deleted':
          handleDeviceDeleted(parsedMessage);
          break;
        default:
          console.warn(`Unhandled topic: ${message.topic}`);
      }
    });

    consumer.on('error', (error) => {
      console.error('Error in Kafka Consumer', error);
      reject(error);
    });

    consumer.on('ready', () => {
      console.log('Kafka Consumer is connected and ready.');
      resolve();
    });
  });
};

const sendMessage = (topic, message) => {
  const payloads = [{ topic, messages: JSON.stringify(message) }];
  producer.send(payloads, (error, data) => {
    if (error) {
      console.error('Error sending message', error);
    } else {
      console.log('Message sent', data);
    }
  });
};

module.exports = {
  initKafkaProducer,
  initKafkaConsumer,
  sendMessage,
};