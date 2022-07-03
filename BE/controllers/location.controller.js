require("dotenv").config();
const locations = require("../models/treatment-location.js");
const users = require("../models/user");

class Locations {
  addLocation = async (req, res) => {
    try {
      console.log(req.user);
      if (!req.user) {
        return res.status(200).json({
          code: 400,
          message: "Login required",
        });
      }
      const userId = req.user.id;
      if (!userId) {
        return res.status(200).json({
          code: 400,
          message: "Login required",
        });
      }
      const user2 = await users.findOne({ _id: userId });
      if (!user2) {
        return res.status(400).json({
          code: 400,
          message: "User does not exist"
        });
      }
      if (user2.role !== "admin") {
        return res.status(400).json({
          code: 400,
          message: "You dont have permission. Only admins can add treatment locations"
        });
      }
      const name = req.body.name;
      const capacity = req.body.capacity;
      const currentAllocation = req.body.currentAllocation;
      if (!name || !capacity || !currentAllocation) {
        return res.status(200).json({
          "code": 400,
          "message": "Some information is missing"
        });
      }
      const location = await locations.findOne({ name: name });
      if (!location) {
        const newLocation = new locations({ name, capacity, currentAllocation });
        await newLocation.save();
        return res.status(200).json({
          "code": 0,
          "message": "Successful."
        });
      }
      res.status(200).json({
        "code": 400,
        "message": "This location has already existed"
      });
    } catch (error) {
      console.log(error);
      res.status(200).json({
        "code": 400,
        "message": error.toString()
      });
    }
  }
  getLocationInfo = async (req, res) => {
    const userId = req.user.id;
    if (!userId) {
      return res.status(200).json({
        code: 400,
        message: "Login required",
      });
    }
    const user2 = await users.findOne({ _id: userId });
    if (!user2) {
      return res.status(400).json({
        code: 400,
        message: "User does not exist"
      });
    }
    if (user2.role !== "admin") {
      return res.status(400).json({
        code: 400,
        message: "You dont have permission. Only admin can see all admins and patients"
      });
    }

    const res2 = await locations.find({});
    console.log(res2);
    return res.status(200).json({
      code: 0,
      message: "Successful.",
      data: res2
    });
  }
}

module.exports = new Locations();