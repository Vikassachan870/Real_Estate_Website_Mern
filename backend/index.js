const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("./uploads"));
const conn = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/yourDatabaseName");
    console.log("Connected to database");
  } catch (err) {
    console.log(err);
  }
};
conn();
const user = require("./Routes/User");
const property = require("./Routes/Property");
app.use("/api/v2", user, property);

app.listen(1000, () => {
  console.log("Server listening on port 1000");
});
