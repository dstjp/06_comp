const express = require("express");
const partController = require("../controllers/partController");

const router = express.Router();

router.get("/", partController.getComponents);
router.get("/:id", partController.getComponentById);

module.exports = router;
