const router = require("express").Router();


// Lists all the resources for the restful api
router.use("/user", require("../routes/user.routes"));
router.use("/auth", require("../routes/auth.routes"));

module.exports = router;