const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectionUrl = process.env.CONNECTION_URL;

const connectMongodb = async () => {
  try {
    await mongoose.connect(connectionUrl);
    console.log("Connected to Mongodb");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectMongodb;
