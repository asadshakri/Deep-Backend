const {MongoClient} = require("mongodb");
require("dotenv").config();
const url = process.env.MONGO_URL;
const dbName = process.env.DB_NAME;

let db;
const client = new MongoClient(url);

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");
    db = client.db(dbName);
    return db;
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err.message);
    throw err;
  }
}

function getDB() {
  if (!db) {
    throw new Error("Database not initialized");
  }
  return db;
}

module.exports = {
    connectDB,
    getDB,
}