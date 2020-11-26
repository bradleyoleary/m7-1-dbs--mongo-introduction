const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getUsers = async (req, res) => {
  //creating new client
  const client = await MongoClient(MONGO_URI, options);

  //connect to the client
  await client.connect();

  //connect to the database
  const db = client.db("exercise_1");
  console.log("connected!");

  const data = await db.collection("users").find().toArray();
  console.log("Here is the user data!", data);

  data.length
    ? res.status(200).json({ status: 200, data })
    : res.status(404).json({ status: 404, message: "Could not find any data" });

  client.close();
  console.log("disconnected!");
};

// getCollection("exercise_1");

module.exports = { getUsers };
