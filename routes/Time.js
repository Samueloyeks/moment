const express = require("express");
const TimeController = require("../app/Controllers/TimeController");

const router = express.Router();

router.get("/", TimeController.getTime);

module.exports = router;
