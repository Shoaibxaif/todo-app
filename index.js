const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const moment = require("moment");
const MongodbConnection = require('./init/mongodb');

MongodbConnection();

const PORT = 8000;
const app = express();





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


app.get("/", async (req, res, next) => {
  try {
    const todos = await Todo.find().sort({createdAt : -1});
    res.locals.moment = moment;
    res.render("index", { title: "List Todo" , todos });
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
   
    const { title, desc } = req.body;
    if(!title){
      return res.status(400).json({message:"Title is empty!"});
    }
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
