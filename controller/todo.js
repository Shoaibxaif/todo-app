const moment = require("moment");
const Todo = require("../models/Todo");

const getAllTodocontroller = async (req, res, next) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.locals.moment = moment;
    res.render("index", { title: "List Todo", todos });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addtodoformController = (req, res, next) => {
  try {
    res.render("newTodo", { title: "Add Todo" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createtodoController = async (req, res, next) => {
  try {
    const { title, desc } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Title is empty!" });
    }
    const newTodo = new Todo({ title, desc });
    await newTodo.save();
    res.status(201).redirect("/");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updatetodoformController = async (req, res, next) => {
  try {
    const { id } = req.query;
    const todo = await Todo.findById(id);

    res.render("updateTodo", { title: "Update todo", todo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deletetodoformController = (req, res, next) => {
  try {
    const { id } = req.query;
    res.render("deleteTodo", { title: "Delete todo" , id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateTodoController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, desc } = req.body;
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: "No todo with this ID found." });
    }
    todo.title = title;
    todo.desc = desc;

    await todo.save();
    res.redirect("/");
  } catch (err) {
    res.status(500).json({ message: err.message });
  
  }
};

const  deleteTodoController = async (req, res, next) => {
  try{
    const { id,confirm} = req.query;
    if(confirm === "yes"){
      await  Todo.findByIdAndDelete(id);
    }

    
    res.redirect("/");
   
  }catch(err){
    res.status(500).json({ message: err.message });
  

  }
}

module.exports = {
  getAllTodocontroller,
  addtodoformController,
  createtodoController,
  updatetodoformController,
  deletetodoformController,
  updateTodoController,
  deleteTodoController
};
