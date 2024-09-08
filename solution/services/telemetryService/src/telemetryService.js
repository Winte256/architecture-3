const { sendMessage } = require('./kafkaClient');

const handleTelemetryData = (data) => {
  console.log('Telemetry data received:', data);
  // Add your business logic here
};

const handleTelemetryAlert = (alert) => {
  console.log('Telemetry alert received:', alert);
  // Add your business logic here
};

module.exports = {
  handleTelemetryData,
  handleTelemetryAlert,
};