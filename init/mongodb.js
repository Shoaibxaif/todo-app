const mongoose = require("mongoose");

const connectionUrl = "mongodb://localhost:27017/todoDb";

const connectMongodb = async () => {
  try {
    await mongoose.connect(connectionUrl);
    console.log("Connected to Mongodb");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = connectMongodb;
