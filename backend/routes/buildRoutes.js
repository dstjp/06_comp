const express = require("express");
const buildController = require("../controllers/buildController");

const router = express.Router();

router.post("/", buildController.createBuild);
router.get("/user/:userId", buildController.getUserBuilds);
router.put("/:id", buildController.updateBuild);
router.delete("/:id", buildController.deleteBuild);

//Development
/* router.get("/builds", buildController.getBuild); 
router.get("/:id", buildController.getBuildById); */

module.exports = router;
