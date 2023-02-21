const router = require("express").Router();


// Lists all the resources for the restful api
router.use("/user", require("../routes/user.routes"));

module.exports = router;