require("dotenv").config();
var mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
const users = require("../models/user");
const bcrypt = require("bcrypt");

class Authorization {

    middleware = (req, res, next) => {
        console.log("middleware called");
        // console.log(req);
        // console.log(req.cookies);
        if (
            req.headers &&
            req.headers.authorization && 
            req.headers.authorization.split(" ")[0] == "Bearer"
        ) {
            // console.log(req.cookies.token);
            jwt.verify(
                req.headers.authorization.split(" ")[1],
                // req.cookies.token,
                process.env.SECRET_KEY,
                function (err, decode) {
                    if (err) {
                        return res.status(200).json({
                            code: 400,
                            message: "Login required",
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
                message: "Login required",
            });
        }
    };

    login=async(req, res)=>{
        console.log("login called");
        const username=req.body.username;
        const password=req.body.password
        const role=req.body.role;

        console.log(username+" "+password+" "+role);
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
        const idNumber=req.body.idNumber;
        if(!idNumber){
            return res.status(200).json({
                "code": 400,
                "message": "Some information is missing"
            });
        }
        const user=await users.findOne({idNumber: idNumber});
        if(!user){  
            const password=req.body.password;
            const fullname=req.body.fullname;
            const phoneNumber=req.body.phoneNumber;
            const email=req.body.email;
            const role=req.body.role;
            const medicalCenter=req.body.medicalCenter;
            const history=req.body.history;
            const status=req.body.status;

            if(!password || !fullname || !phoneNumber || !email || !role ){
                return res.status(200).json({
                    "code": 400,
                    "message": "Some information is missing"
                });
            }
            if(role=="user"){
                if(!medicalCenter || !status){
                    return res.status(200).json({
                        "code": 400,
                        "message": "Some information is missing"
                    });
                }
            }
            const newUser=new users({password, fullname, phoneNumber, email, role, idNumber, medicalCenter, status, history});
            await newUser.save();
            // console.log(insertResponse.rows);
            return res.status(200).json({
                "code": 0,
                "message": "Successful."
            });
        }
        res.status(200).json({
            "code": 400,
            "message": "This person has already had an account"
        });
    }

    getUserInformation = async(req, res)=>{
        const userId=req.user.id;
        if(!userId){
            return res.status(200).json({
                code: 400,
                message: "Login required",
            });
        }
        const user=await users.findOne({_id: userId});
        if(!user){
            return res.status(400).json({
                code: 0,
                message: "User not exist"
            });
        }
        return res.status(200).json({
            code: 0,
            message: "Successful.",
            data: JSON.stringify(user)
        });
    }
}

module.exports= new Authorization();