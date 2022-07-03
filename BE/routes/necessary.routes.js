const router = require("express").Router();
const authorizationController = require("../controllers/authorization.controller");
const necessaryController=require("../controllers/necessary.controller");

router.post("/addNecessary", authorizationController.middleware, necessaryController.addNecessary);
router.get("/getAllNecessaries", authorizationController.middleware, necessaryController.getAllNecessaries);

module.exports = router;