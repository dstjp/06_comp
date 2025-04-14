const express = require("express");
const buildController = require("../controllers/buildController");

const router = express.Router();

router.post("/", buildController.createBuild);
router.get("/builds", buildController.getBuild); //Might delete
router.get("/:id", buildController.getBuildById);
router.get("/user/:userId", buildController.getUserBuilds);
router.put("/:id", buildController.updateBuild);
router.delete("/:id", buildController.deleteBuild);

module.exports = router;
