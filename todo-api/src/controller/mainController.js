const router = require("express").Router();
const todoItemController = require("./todoItemController");
const subItemController = require("./subItemController");
const authService = require("../service/authService");
const checkAuth = require("../middleware/check-auth");

router.use("/auth", authService);
router.use("/item", checkAuth, todoItemController);
router.use("/subItem", checkAuth, subItemController);

module.exports = router;
