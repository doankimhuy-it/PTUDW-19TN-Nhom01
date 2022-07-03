require("dotenv").config();
var mongoose = require("mongoose");
const groupOfNecessaries = require("../models/groupOfNecessaries");
const users=require("../models/user");

class GroupOfNecessaries {
    getGroupByID = async(req, res) => {
        const groupID = req.groupOfNecessaries.groupID;
        const group = await groupOfNecessaries.findOne({_id: groupID})
        if (!group) {
            return res.status(400).json({
                code: 0,
                message: "This group is not exist"
            });
        }
        else {
            return res.status(200).json({
                code: 0,
                message: "Successful.",
                data: group
            });
        }
    }

    getAllGroups = async(req, res) => {
        const allGroups = await groupOfNecessaries.find({})
        return res.status(200).json({
            code: 0,
            message: "Successful.",
            data: allGroups
        });
    }

    //need help :))
    addGroup = async(req, res) => {
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
                    message: "You dont have permission. Only manager and admin can update group of necessaries"
                });
            } else {
                const groupName = req.body.groupName
                const quantity = req.body.quantity
                const price = req.body.price
                const description = req.body.description
                const unit=req.body.unit;
                if (!groupName || !quantity || !price) {
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

    getAllGroups = async(req, res)=>{
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
                    message: "You dont have permission. Only manager and admin can see all of necessaries"
                });
            }
    
            const res2 = await groupOfNecessaries.find();
    
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

    // updateNecessary = async(req, res) => {

    //     if(!(req.user && req.user.id) ){
    //         return res.status(400).json({
    //             code: 400,
    //             message: "Login required"
    //         });
    //     }

    //     const user2 = users.findOne({_id: req.user.id});
    //     if(!user2){
    //         return res.status(400).json({
    //             code: 400,
    //             message: "Login required"
    //         });
    //     }

    //     if (user2.role == "user") {
    //         return res.status(400).json({
    //             code: 400,
    //             message: "You dont have permission. Only manager and admin can update necessary"
    //         });
    //     }

    //         const name = req.body.necessaryName
    //         const quantity = req.body.quantity
    //         const price = req.body.price
    //         const description = req.body.description

    //         const necessary = necessaries.findOne({_id: id})
    //         if (!necessary) {
    //             res.status(200).json({
    //                 "code": 400,
    //                 "message": "This necessary isn't in database"
    //             });
    //         }
    //         else {
    //             if (name) {
    //                 necessary.necessaryName = name
    //             }
    //             if (quantity) {
    //                 necessary.quantity = quantity
    //             }
    //             if (price) {
    //                 necessary.price = price
    //             }
    //             if (description) {
    //                 necessary.description = description
    //             }
    //             res.status(200).json({
    //                 "code": 400,
    //                 "message": "Finish update nacessary info"
    //             });
    //         }
        
    // }
}

module.exports = new GroupOfNecessaries()
