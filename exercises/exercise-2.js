const assert = require("assert");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const createGreeting = async (req, res) => {
  console.log(req.body);
  //   res.status(200).json("ok");
  try {
    //create new client
    const client = await MongoClient(MONGO_URI, options);
    //connect to new client
    await client.connect();
    //connect to the db
    const db = client.db("exercise_2");
    console.log("connected!");
    //adding item to the db
    const result = await db.collection("greetings").insertOne(req.body);
    assert.strictEqual(1, result.insertedCount);

    res.status(201).json({ status: 201, data: req.body });
  } catch (err) {
    res.status(500).json({ status: 500, data: req.body, message: err.message });
    console.log(err.stack);
  }
  client.close();
  console.log("disconnected!");
};

//exercise 2.3
const getGreeting = async (req, res) => {
  //   res.status(200).json("bacon");
  const _id = req.params._id;
  console.log(_id);

  //create new client
  const client = await MongoClient(MONGO_URI, options);
  //connect to new client
  await client.connect();
  //connect to the db
  const db = client.db("exercise_2");
  console.log("connected!");

  db.collection("greetings").findOne({ _id }, (err, result) => {
    result
      ? res.status(200).json({ status: 200, _id, data: result })
      : res.status(404).json({ status: 404, _id, data: "not found" });
    client.close();
  });
};

module.exports = { getGreeting, createGreeting };
