"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { getUsers } = require("./exercises/exercise-1.3");
const { addUser } = require("./exercises/exercise-1.4");
const {
  getGreeting,
  getGreetings,
  createGreeting,
  deleteGreeting,
  updateGreeting,
} = require("./exercises/exercise-2");

const PORT = process.env.PORT || 8000;

express()
  .use(morgan("tiny"))
  .use(express.static("public"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  // exercise 1
  .get("/exercise_1/users", getUsers)
  .post("/exercise_1/users", addUser)

  // exercise 2
  .get("/exercise_2/greeting", getGreetings)
  .get("/exercise_2/greeting/:_id", getGreeting)
  .post("/exercise_2/greeting", createGreeting)
  .delete("/exercise_2/greeting/:_id", deleteGreeting)
  .put("/exercise_2/greeting/:_id", updateGreeting)

  // handle 404s
  .use((req, res) => res.status(404).type("txt").send("🤷‍♂️"))

  .listen(PORT, () => console.log(`Listening on port ${PORT}`));
