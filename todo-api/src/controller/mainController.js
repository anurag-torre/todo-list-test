const router = require("express").Router();
const todoItemController = require("./todoItemController");
const subItemController = require("./subItemController");

router.use("/item", todoItemController);
router.use("/subItem", subItemController);

module.exports = router;
