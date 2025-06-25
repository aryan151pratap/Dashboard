const clusterData = {
  name: "iotCluster",
  uri: "mongodb+srv://admin:pass@iotcluster.mongodb.net", // optional metadata
  databases: [
    {
      name: "sensorDB",
      collections: ["temperature", "humidity", "pressure"]
    },
    {
      name: "deviceLogs",
      collections: ["bootLogs", "errorLogs", "runtimeStats"]
    },
    {
      name: "statusDB",
      collections: ["uptime", "statusHistory", "batteryHealth"]
    }
  ]
};

export default clusterData;
