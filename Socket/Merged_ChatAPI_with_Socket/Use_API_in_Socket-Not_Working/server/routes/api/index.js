let router = require("express").Router();

// // Basic Routes
router.use("/", require("./user"));
// router.use("/", require("./orders"));
// router.use("/", require("./product"));
// router.use("/", require("./categories"));

module.exports = router;
