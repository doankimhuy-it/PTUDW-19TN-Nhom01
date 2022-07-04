const router = require("express").Router();
const authorizationController = require("../controllers/authorization.controller");
const necessaryController=require("../controllers/necessary.controller");
const groupController=require("../controllers/group.controller");

router.post("/addNecessary", authorizationController.middleware, necessaryController.addNecessary);
router.get("/getAllNecessaries", authorizationController.middleware, necessaryController.getAllNecessaries);
router.get("/getAllGroupNecessaries", authorizationController.middleware, groupController.getAllGroups);
router.post("/addGroupNecessaries", authorizationController.middleware, groupController.addGroup);
router.post("/getGroup", groupController.getGroupByID);

module.exports = router;