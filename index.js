const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");

const PORT = 8000;
const app = express();

const connectionUrl = "mongodb://localhost:27017/todoDb";

mongoose
  .connect(connectionUrl)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error(err);
  });

const todoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true,unique:true },
    desc: { type: String },
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", todoSchema);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res, next) => {
  try {
    res.render("index", { title: "List Todo" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/add-todo", (req, res, next) => {
  try {
    res.render("newTodo", { title: "Add Todo" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/add-todo", async (req, res, next) => {
  try {
    if(!title){
      return res.status(400).json({message:"Title is empty!"});
    }
    const { title, desc } = req.body;
    const newTodo = new Todo({ title, desc });
    await newTodo.save();
    res.status(201).redirect("/");
    } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
