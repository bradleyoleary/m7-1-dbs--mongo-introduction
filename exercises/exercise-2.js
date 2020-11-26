const assert = require("assert");
const { query } = require("express");
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
    const result = await db.collection("greetings").insertOne(req.body); //THIS GUY
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
    console.log("disconnected!");
  });
};

//exercise 2.4
const getGreetings = async (req, res) => {
  //create new client
  const client = await MongoClient(MONGO_URI, options);
  //connect to new client
  await client.connect();
  //connect to the db
  const db = client.db("exercise_2");
  console.log("connected!");

  db.collection("greetings")
    .find()
    .toArray((err, result) => {
      if (result.length) {
        //console.log(result);
        //need to set the req.query quantities to a default of 0 and 25
        //confirm if the start of the query is a valid num
        const start = Number(req.query.start) || 0;
        const cleanStart = start > -1 && start < result.length ? start : 0;

        //confirm if the end of query is a valid num
        const end = cleanStart + (Number(req.query.end) || 25);
        const cleanEnd = end > result.length ? result.length - 1 : end;

        //returning the data
        const data = result.slice(cleanStart.cleanEnd);
        res.status(200).json({
          status: 200,
          start: cleanStart,
          limit: cleanEnd - cleanStart,
          data,
        });
      } else {
        res.status(404).json({
          status: 404,
          data: "Data not found",
        });
      }
      client.close();
      console.log("disconnected!");
    });
};

const deleteGreeting = async (req, res) => {
  const _id = req.params._id;
  //create new client
  const client = await MongoClient(MONGO_URI, options);
  try {
    //connect to new client
    await client.connect();
    //connect to the db
    const db = client.db("exercise_2");
    console.log("connected!");
    //deleting item from the db
    const result = await db
      .collection("greetings")
      .deleteOne({ _id: _id.toUpperCase() });
    assert.strictEqual(1, result.deletedCount);
    //console.log(result);
    res.status(204).json({ status: 204, deletedGreeting: _id });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
  client.close();
  console.log("disconnected!");
};

module.exports = { getGreeting, getGreetings, createGreeting, deleteGreeting };
