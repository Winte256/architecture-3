const { initKafkaProducer, initKafkaConsumer } = require('./kafkaClient');

const startService = async () => {
  await initKafkaProducer();
  await initKafkaConsumer();
  console.log('Device service is running and connected to Kafka.');
};

startService().catch(error => {
  console.error('Error starting the service:', error);
});