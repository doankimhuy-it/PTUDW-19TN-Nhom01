require("dotenv").config();
var mongoose = require("mongoose");
const necessaries = require("../models/necessary");

class Necessary {
    getNecessaryByID = async(req, res) => {
        const necessaryID = req.necessary.necessaryID;
        const necessary = await necessaries.findOne({_id: necessaryID})
        if (!necessary) {
            return res.status(400).json({
                code: 0,
                message: "This necessary not exist"
            });
        }
        else {
            return res.status(200).json({
                code: 0,
                message: "Successful.",
                data: necessary
            });
        }
    }

    getAllNecessaries = async(req, res) => {
        const allNecessaries = await necessaries.find({})
        return res.status(200).json({
            code: 0,
            message: "Successful.",
            data: allNecessaries
        });
    }

    addNecessary = async(req, res) => {
        const userRole = req.user.role;
        if (userRole == "User") {
            return res.status(400).json({
                code: 400,
                message: "You dont have permission. Only manager and admin can add necessary"
            });
        } else {
            const id = req.body.necessaryID
            const name = req.body.necessaryName
            const quantity = req.body.quantity
            const price = req.body.price
            const description = req.body.description
            const img = req.body.image

            if (!id || !name || !quantity || !price) {
                return res.status(200).json({
                    "code": 400,
                    "message": "Some information is missing"
                });
            } else {
                const check = necessaries.findOne({_id: id})
                if (check) {
                    res.status(200).json({
                        "code": 400,
                        "message": "Already have this necessary in database"
                    });
                }

                const newNecessary = new Necessary({id, name, quantity, price, description, img})
                await newNecessary.save()
                return res.status(200).json({
                    "code": 0,
                    "message": "Successful."
                });
            }
        }
    }

    updateNecessary = async(req, res) => {
        const userRole = req.user.role;
        if (userRole == "User") {
            return res.status(400).json({
                code: 400,
                message: "You dont have permission. Only manager and admin can add necessary"
            });
        }
        else {
            const id = req.body.necessaryID
            const name = req.body.necessaryName
            const quantity = req.body.quantity
            const price = req.body.price
            const description = req.body.description
            const img = req.body.image

            const check = necessaries.findOne({_id: id})
            if (!check) {
                res.status(200).json({
                    "code": 400,
                    "message": "This necessary isn't in database"
                });
            }
            else {
                
            }
        }
    }
}

module.exports = new Necessary()
