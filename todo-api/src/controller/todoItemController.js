const {
  getAllTodos,
  saveTodo,
  deleteTodo,
  updateTodo,
  deleteCompleted,
} = require("../service/todoItemService");

const router = require("express").Router();
//Add a logger for errors

router.get("/", (req, res) => {
  getAllTodos()
    .then((items) => {
      return res.status(200).json(items);
    })
    .catch((error) => {
      return res.status(404).json("No item found");
    });
});

router.post("/", (req, res) => {
  saveTodo(req.body)
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((error) => {
      return res.status(500).json("Error Saving");
    });
});

router.delete("/:_id", async (req, res) => {
  try {
    const data = await deleteTodo(req.params._id);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json("Error Deleting");
  }
});

router.put("/", async (req, res) => {
  try {
    const data = await updateTodo(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json("Error Deleting");
  }
});

router.delete("/items/completed", async (req, res) => {
  try {
    const data = await deleteCompleted();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json("Error Deleting Completed Items");
  }
});

module.exports = router;
