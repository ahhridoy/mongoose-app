const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const todoSchema = require("../schemas/todoSchema.js");
const Todo = new mongoose.model("Todo", todoSchema);

// Get all the todos
router.get("/", async (req, res) => {
  const result = await Todo.find({ status: "active" }, (err, data) => {
   if (err) {
     res.status(500).json({
       error: "There was a server side error!",
     });
   } else {
     res.status(200).json({
       result: data,
       message: "Todos were updated successfully!",
     });
   }
 }).clone();
});

// Get a todo by id
router.get("/:id", async (req, res) => {});

// Post a todo
router.post("/", async (req, res) => {
  const newTodo = new Todo(req.body);
  await newTodo.save((err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "Todo was inserted successfully!",
      });
    }
  });
});

// Post multiple todos
router.post("/all", async (req, res) => {
  await Todo.insertMany(req.body, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "Todos were inserted successfully!",
      });
    }
  });
});

// put a todo by id
router.put("/:id", async (req, res) => {
  const result = await Todo.updateOne(
    { _id: req.params.id },
    {
      $set: {
        status: "inactive",
      },
    },
    (err) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          message: "Todos were updated successfully!",
        });
      }
    }
  ).clone();
});

// Delete a todo by id
router.delete("/:id", async (req, res) => {});

module.exports = router;
