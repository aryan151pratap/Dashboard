const clusterData = [
  {
    name: "iotCluster",
    databases: [
      {
        name: "sensorDB",
        collections: ["temperature", "humidity", "pressure"]
      },
      {
        name: "deviceLogs",
        collections: ["bootLogs", "errorLogs", "runtimeStats"]
      }
    ]
  },
  {
    name: "chatCluster",
    databases: [
      {
        name: "chatApp",
        collections: ["users", "messages", "groups"]
      },
      {
        name: "analytics",
        collections: ["messageCounts", "userSessions"]
      }
    ]
  },
  {
    name: "blogCluster",
    databases: [
      {
        name: "blogDB",
        collections: ["posts", "comments", "authors"]
      },
      {
        name: "mediaDB",
        collections: ["images", "videos", "attachments"]
      }
    ]
  }
];

export default clusterData;
