const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const MongodbConnection = require("./init/mongodb");
const todoRoute = require("./routes/todo");

MongodbConnection();

const PORT = 8000;
const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/",todoRoute);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
