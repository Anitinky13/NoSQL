const router = require("express").Router();
const userRoutes = require("./user-routes");
const thoughtRoutes = require("./thought-routes");
router.use("/", thoughtRoutes);
router.use("/", userRoutes);

module.exports = router;
