const router = require("express").Router();
const authorizationController = require("../controllers/authorization.controller");

router.post("/register", authorizationController.register);
router.post("/login", authorizationController.login);
/* router.get(
    "/getUserInfo",
    authorizationController.middleware,
    authorizationController.getUserInfo
);
router.put(
    "/updateUserInfo",
    authorizationController.middleware,
    authorizationController.updateUserInfo
); */

module.exports = router;