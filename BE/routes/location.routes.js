const router = require("express").Router();
const authorizationController = require("../controllers/authorization.controller");
const locationController = require("../controllers/location.controller");

router.post("/addLocation", authorizationController.middleware, locationController.addLocation);
router.get("/getLocationInfo", authorizationController.middleware, locationController.getLocationInfo);

module.exports = router;