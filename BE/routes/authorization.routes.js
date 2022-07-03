const router = require("express").Router();
const authorizationController = require("../controllers/authorization.controller");

router.post("/register", authorizationController.middleware, authorizationController.register);
router.post("/createAdmin", authorizationController.createAdmin);
router.post("/login", authorizationController.login);
router.get("/userInformation", authorizationController.middleware, authorizationController.getUserInformation);
router.get("/patientsInformation", authorizationController.middleware, authorizationController.getAllPatientsInformation);
router.post("/setAccountStatus", authorizationController.middleware, authorizationController.setAccountStatus);
router.post("/createAdminOrMngr", authorizationController.middleware, authorizationController.createAdminOrMngr);

module.exports = router;