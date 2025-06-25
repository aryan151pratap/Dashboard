import express from "express";
import { MongoClient } from "mongodb";

const router = express.Router();

router.post("/", async (req, res) => {
	const { uri, database, collection } = req.body;

	if (!uri || !database || !collection) {
		return res.status(400).json({
		ok: false,
		message: "Missing URI, database, or collection",
		});
	}

	const client = new MongoClient(uri, {
		serverApi: { version: "1", strict: true, deprecationErrors: true },
	});

	try {
		await client.connect();
		const db = client.db(database);
		const data = await db.collection(collection).find().limit(100).toArray(); // Optional: add filters or pagination

		res.status(200).json({
			ok: true,
			data,
		});

	} catch (err) {
		res.status(500).json({
		ok: false,
		message: "Failed to fetch collection data",
		error: err.message,
		});
	} finally {
		await client.close(); // Always close connection
	}
});

export default router;
