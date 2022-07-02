require("dotenv").config();
var mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
const users = require("../models/user");
const bcrypt = require("bcrypt");

class Authorization {

    middleware = (req, res, next) => {
        if (
            req.headers &&
            req.headers.authorization &&
            req.headers.authorization.split(" ")[0] == "Bearer"
        ) {
            jwt.verify(
                req.headers.authorization.split(" ")[1],
                process.env.SECRET_KEY,
                function (err, decode) {
                    if (err) {
                        return res.status(200).json({
                            code: 400,
                            message: "Unauthorized user",
                        });
                    }
                    req.user = decode;
                    next();
                }
            );
        } else {
            // return unauthorized message
            return res.status(200).json({
                code: 400,
                message: "Unauthorized user",
            });
        }
    };

    login=async(req, res)=>{
        console.log("login called");
        const username=req.body.username;
        const password=req.body.password
        const role=req.body.role;
        if(!username || !password || !role){
            return res.status(200).json({
                "code": 400,
                "message": "Some information is missing"
            });
        }
        const user=await users.findOne({
            username: username,
            password: password,
            role: role,
        });
        if(!user){
            return res.status(200).json({
                "code": 400,
                "message": "Username or password incorrect"
            });
        }
        const token = jwt.sign(
            { id: user._id },
            process.env.SECRET_KEY
        );
        return res.status(200).json({
            "code": 0,
            "message": "Successful.",
            "data": token,
        });
    }

    register=async (req, res)=>{
        const username=req.body.username;
        if(!username){
            return res.status(200).json({
                "code": 400,
                "message": "Some information is missing"
            });
        }
        const user=await users.findOne({username: username});
        if(!user){
            
            const password=req.body.password;
            const fullname=req.body.fullname;
            const phoneNumber=req.body.phoneNumber;
            const email=req.body.email;
            const role=req.body.role;
            if(!username || !password || !fullname || !phoneNumber || !email || !role){
                return res.status(200).json({
                    "code": 400,
                    "message": "Some information is missing"
                });
            }
            const newUser=new users({username, password, fullname, phoneNumber, email, role});
            await newUser.save();
            // console.log(insertResponse.rows);
            return res.status(200).json({
                "code": 0,
                "message": "Successful."
            });
        }
        res.status(200).json({
            "code": 400,
            "message": "Username is already used by other user"
        });
    }

}

module.exports= new Authorization();