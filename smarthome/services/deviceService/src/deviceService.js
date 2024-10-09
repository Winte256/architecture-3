// const { sendMessage } = require('./kafkaClient');

const handleDeviceCreated = (device) => {
  console.log('Device created:', device);
  // Add your business logic here
};

const handleDeviceUpdated = (device) => {
  console.log('Device updated:', device);
  // Add your business logic here
};

const handleDeviceDeleted = (device) => {
  console.log('Device deleted:', device);
  // Add your business logic here
};

module.exports = {
  handleDeviceCreated,
  handleDeviceUpdated,
  handleDeviceDeleted,
};