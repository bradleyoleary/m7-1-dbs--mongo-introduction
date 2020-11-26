const fs = require("file-system");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const assert = require("assert");
const { MONGO_URI } = process.env;
const greetings = JSON.parse(fs.readFileSync("data/greetings.json"));

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const batchImport = async () => {
  //   console.log(greetings);
  try {
    //create new client
    const client = await MongoClient(MONGO_URI, options);
    //connect to new client
    await client.connect();
    //connect to the db
    const db = client.db("exercise_2");
    console.log("connected!");
    //accessing the greetings.json and inserting new data
    const result = await db.collection("greetings").insertMany(greetings);
    assert.strictEqual(greetings.length, result.insertedCount);
    console.log("The new data has been added.");
  } catch (err) {
    console.log(err.stack);
  }
  client.close();
  console.log("disconnected!");
};

batchImport();
