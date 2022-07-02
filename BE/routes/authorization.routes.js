const router = require("express").Router();
const authorizationController = require("../controllers/authorization.controller");

router.post("/register", authorizationController.register);
router.post("/login", authorizationController.login);
router.get("/userInformation", authorizationController.middleware, authorizationController.getUserInformation);

module.exports = router;