const express = require("express");
const router = express.Router();
const todoController = require("../controller/todo");

router.get("/", todoController.getAllTodocontroller);
router.get("/add-todo", todoController.addtodoformController);
router.post("/add-todo", todoController.createtodoController);
router.get("/update-todo", todoController.updatetodoformController);
router.get("/delete-todo", todoController.deletetodoformController);

router.post("/update-todo/:id", todoController.updateTodoController);
router.get("/confirm-delete",todoController.deleteTodoController)
module.exports = router;
