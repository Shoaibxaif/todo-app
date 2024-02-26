const express = require("express");
const router = express.Router();
const todoController = require("../controller/todo");

router.get("/", todoController.getAllTodocontroller);
router.get("/add-todo", todoController.addtodoformController);
router.post("/add-todo", todoController.createtodoController);
router.post("/update-todo", todoController.updatetodoformController);
router.post("/delete-todo", todoController.deletetodoformController);

module.exports = router;
