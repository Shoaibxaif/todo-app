const express = require("express");
const router = express.Router();
const moment = require("moment");
const Todo = require("../models/Todo")


router.get("/", async (req, res, next) => {
    try {
      const todos = await Todo.find().sort({ createdAt: -1 });
      res.locals.moment = moment;
      res.render("index", { title: "List Todo", todos });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  router.get("/add-todo", (req, res, next) => {
    try {
      res.render("newTodo", { title: "Add Todo" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  router.post("/add-todo", async (req, res, next) => {
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
  });
  
  module.exports  = router;