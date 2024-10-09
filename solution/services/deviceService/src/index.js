const { initKafkaProducer, initKafkaConsumer, testKafkaConnection } = require('./kafkaClient');

const startService = async () => {
  console.log('init');
  await testKafkaConnection();
  await initKafkaProducer();
  await initKafkaConsumer();
  console.log('Device service is running and connected to Kafka.');
};

startService().catch(error => {
  console.error('Error starting the service:', error);
});