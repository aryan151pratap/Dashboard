import express from "express";
import { MongoClient } from "mongodb";

const router = express.Router();

router.post("/", async (req, res) => {
  const { uri } = req.body;
  console.log(uri);
  if (!uri) return res.status(400).json({ error: "No URI provided" });

  try {
    const client = new MongoClient(uri, {
      serverApi: { version: "1", strict: true, deprecationErrors: true },
    });

    await client.connect();
    const admin = client.db().admin();
    const dbs = await admin.listDatabases();

    const clusterData = {
      name: "Custom Cluster",
	  uri,
      databases: [],
    };

    for (const dbInfo of dbs.databases) {
      const db = client.db(dbInfo.name);
      const collections = await db.listCollections().toArray();

      clusterData.databases.push({
        name: dbInfo.name,
        collections: collections.map((col) => col.name),
      });
    }

    await client.close();
	console.log(clusterData);

    res.status(200).json({
		ok: true,
		data: clusterData,
	});

  } catch (err) {
    res.status(500).json({ 
		ok: false,
		message: "Connection failed", 
		error: err.message 
	});
  }
});

export default router;
