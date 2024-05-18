const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/events", require("./event.routes"));
router.use("/participants", require("./participants.routes"));

module.exports = router;
