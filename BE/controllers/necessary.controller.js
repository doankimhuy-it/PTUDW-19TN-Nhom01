require("dotenv").config();
var mongoose = require("mongoose");
const necessaries = require("../models/necessary");
const users=require("../models/user");

class Necessary {
    getNecessaryByID = async(req, res) => {
        const necessaryID = req.necessary.necessaryID;
        const necessary = await necessaries.findOne({_id: necessaryID})
        if (!necessary) {
            return res.status(400).json({
                code: 400,
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
        try {
            if(!(req.user && req.user.id) ){
                return res.status(400).json({
                    code: 400,
                    message: "Login required"
                });
            }
    
            const user2=users.findOne({_id: req.user.id});
            if(!user2){
                return res.status(400).json({
                    code: 400,
                    message: "Login required"
                });
            }
    
            if (user2.role == "user") {
                return res.status(400).json({
                    code: 400,
                    message: "You dont have permission. Only manager and admin can update necessary"
                });
            } else {
                const necessaryName = req.body.necessaryName
                const quantity = req.body.quantity
                const price = req.body.price
                const description = req.body.description
                const unit=req.body.unit;
                if (!necessaryName || !quantity || !price) {
                    return res.status(200).json({
                        "code": 400,
                        "message": "Some information is missing"
                    });
                } else {
    
                    const newNecessary = new necessaries({necessaryName, quantity, price, description, unit})
                    await newNecessary.save();
                    return res.status(200).json({
                        "code": 0,
                        "message": "Successful."
                    });
                }
            }
        } catch (error) {
            console.log(error);
            return res.status(200).json({
                code: 400,
                message: error
            });
        }   
    }

    getAllNecessaries=async(req, res)=>{
        try {
            if(!(req.user && req.user.id) ){
                return res.status(400).json({
                    code: 400,
                    message: "Login required"
                });
            }
    
            const user2 = users.findOne({_id: req.user.id});
            if(!user2){
                return res.status(400).json({
                    code: 400,
                    message: "Login required"
                });
            }
    
            if (user2.role == "user") {
                return res.status(400).json({
                    code: 400,
                    message: "You dont have permission. Only manager and admin can see all necessaries"
                });
            }
    
            const res2=await necessaries.find();
    
            return res.status(200).json({
                code: 0,
                message: "Successful.",
                data: res2
            });
        } catch (error) {
            console.log(error);
            return res.status(200).json({
                code: 400,
                message: error
            });
        }
    }

    

    updateNecessary = async(req, res) => {

        try {
            if(!(req.user && req.user.id) ){
                return res.status(400).json({
                    code: 400,
                    message: "Login required"
                });
            }
    
            const user2 = users.findOne({_id: req.user.id});
            if(!user2){
                return res.status(400).json({
                    code: 400,
                    message: "Login required"
                });
            }
    
            if (user2.role == "user") {
                return res.status(400).json({
                    code: 400,
                    message: "You dont have permission. Only manager and admin can update necessary"
                });
            }
                const id=req.body.id;
                const name = req.body.necessaryName
                const quantity = req.body.quantity
                const price = req.body.price
                const description = req.body.description
    
                if(!name || !quantity || !price){
                    res.status(200).json({
                        "code": 400,
                        "message": "Some information is missing"
                    });
                }
    
                const originalNecessary = await necessaries.findOne({_id: id})
                console.log(originalNecessary);
                if (!originalNecessary) {
                    return res.status(200).json({
                        "code": 400,
                        "message": "This necessary isn't in database"
                    });
                }
                else {
                    if (name) {
                        originalNecessary.necessaryName = name
                    }
                    if (quantity) {
                        originalNecessary.quantity = quantity
                    }
                    if (price) {
                        originalNecessary.price = price
                    }
                    if (description) {
                        originalNecessary.description = description
                    }
                    await originalNecessary.save();
                    res.status(200).json({
                        "code": 0,
                        "message": "Finish update nacessary info"
                    });
                }
            
        } catch (error) {
            console.log(error);
            res.status(200).json({
                "code": 400,
                "message": error
            });
        }
    }
}

module.exports = new Necessary()
