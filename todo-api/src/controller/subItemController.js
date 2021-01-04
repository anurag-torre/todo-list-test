const router = require("express").Router();

const {
  addSubItem,
  deleteSubItem,
  updateSubItem,
} = require("../service/subItemService");

router.post("/", async (req, res) => {
  try {
    const data = await addSubItem(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(404).json("Could not save sub item");
  }
});

router.delete("/", async (req, res) => {
  try {
    const data = await deleteSubItem(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(404).json("Could not save sub item");
  }
});

router.put("/", (req, res) => {
  updateSubItem(req.body)
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((err) => {
      return res.status(500).json("Error Deleting Subitem");
    });
});

module.exports = router;
