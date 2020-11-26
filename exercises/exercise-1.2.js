const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getCollection = async (database) => {
  //creating new client
  const client = await MongoClient(MONGO_URI, options);

  //connect to the client
  await client.connect();

  //connect to the database
  const db = client.db(database);
  console.log("connected!");

  const data = await db.collection("users").find().toArray();
  console.log("Here is the user data!", data);

  client.close();
  console.log("disconnected!");
};

getCollection("exercise_1");
