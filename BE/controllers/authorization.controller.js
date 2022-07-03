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
                    if (err || !decode) {
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

    login = async (req, res) => {
        console.log("login called");
        const idNumber = req.body.idNumber;
        const password = req.body.password
        const role = req.body.role;

        console.log(idNumber + " " + password + " " + role);
        if (!idNumber || !password || !role) {
            return res.status(200).json({
                "code": 400,
                "message": "Some information is missing"
            });
        }
        const user = await users.findOne({
            idNumber: idNumber,
            password: password,
            role: role,
        });
        if (!user) {
            return res.status(200).json({
                "code": 400,
                "message": "Id number or password incorrect"
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

    register = async (req, res) => {
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
                    message: "User not exist"
                });
            }
            if (user2.role !== "manager") {
                return res.status(400).json({
                    code: 400,
                    message: "You dont have permission. Only manager can add patient"
                });
            }
            const idNumber = req.body.idNumber;
            if (!idNumber) {
                return res.status(200).json({
                    "code": 400,
                    "message": "Some information is missing"
                });
            }
            const user = await users.findOne({ idNumber: idNumber });
            if (!user) {
                const password = req.body.password;
                const fullname = req.body.fullname;
                const phoneNumber = req.body.phoneNumber;
                const email = req.body.email;
                const role = req.body.role;
                const medicalCenter = req.body.medicalCenter;
                const history = req.body.history;
                const status = req.body.status;
                const dayOfBirth = req.body.dayOfBirth;

                console.log(password + " " + fullname + " " + role);
                if (!password || !fullname || !role || !medicalCenter || !status) {
                    return res.status(200).json({
                        "code": 400,
                        "message": "Some information is missing"
                    });
                }
                if (role != "user") {
                    return res.status(200).json({
                        "code": 400,
                        "message": "Currently we only allow to register patient"
                    });
                }
                const newUser = new users({ password, fullname, phoneNumber, email, role, idNumber, medicalCenter, status, history, dayOfBirth });
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
        } catch (error) {
            console.log(error);
            res.status(200).json({
                "code": 400,
                "message": error
            });
        }
    }

    getUserInformation = async (req, res) => {
        const userId = req.user.id;
        if (!userId) {
            return res.status(200).json({
                code: 400,
                message: "Login required",
            });
        }
        const user = await users.findOne({ _id: userId });
        if (!user) {
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

    getAllPatientsInformation = async (req, res) => {
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
                message: "User not exist"
            });
        }
        if (user2.role !== "manager") {
            return res.status(400).json({
                code: 400,
                message: "You dont have permission. Only manager can see all patients"
            });
        }

        const res2 = await users.find({ role: "user" });
        console.log(res2);
        return res.status(200).json({
            code: 0,
            message: "Successful.",
            data: res2
        });

    }

    createAdmin = async (req, res) => {
        console.log("create admin called");
        const username = req.body.username;
        const idNumber = req.body.idNumber;
        if (!username || !idNumber) {
            return res.status(200).json({
                "code": 400,
                "message": "Some information is missing"
            });
        }
        const user = await users.findOne({ idNumber: idNumber });
        if (!user) {
            const password = req.body.password;
            const fullname = req.body.fullname;
            const phoneNumber = req.body.phoneNumber;
            const email = req.body.email;
            const role = "admin";

            if (!username || !password || !fullname || !phoneNumber || !email) {
                return res.status(200).json({
                    "code": 400,
                    "message": "Some information is missing"
                });
            }
            const newUser = new users({ password, fullname, phoneNumber, email, role, idNumber });
            await newUser.save();
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

    setAccountStatus = async (req, res) => {
        console.log("set account status called");
        const userId = req.user.id;
        if (!userId) {
            return res.status(200).json({
                code: 400,
                message: "Login required",
            });
        }
        const username = req.body.username;
        if (!username) {
            return res.status(200).json({
                "code": 400,
                "message": "Username is missing"
            });
        }
        const accountStatus = req.body.accountStatus;
        if (!accountStatus) {
            return res.status(200).json({
                "code": 400,
                "message": "Account status is missing"
            });
        }
        await users.updateOne({ username: username }, { $set: { accountStatus: accountStatus } }, function (err, _doc) {
            if (err) {
                return res.status(200).json({
                    "code": 400,
                    "message": err.toString()
                });
            }
        });
        return res.status(200).json({
            "code": 0,
            "message": "Successful."
        });
    }

    createAdminOrMngr = async (req, res) => {
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
                    message: "User not exist"
                });
            }
            if (user2.role !== "admin") {
                return res.status(400).json({
                    code: 400,
                    message: "You dont have permission. Only admins can add other admins or managers"
                });
            }
            const idNumber = req.body.idNumber;
            if (!idNumber) {
                return res.status(200).json({
                    "code": 400,
                    "message": "Some information is missing"
                });
            }
            const user = await users.findOne({ idNumber: idNumber });
            if (!user) {
                const password = req.body.password;
                const fullname = req.body.fullname;
                const username = req.body.username;
                const role = req.body.role;

                if (!password || !fullname || !role) {
                    return res.status(200).json({
                        "code": 400,
                        "message": "Some information is missing"
                    });
                }
                if (role == "user") {
                    return res.status(200).json({
                        "code": 400,
                        "message": "Admins do not manage regular users"
                    });
                }
                const newUser = new users({ password, fullname, username, role, idNumber });
                await newUser.save();
                return res.status(200).json({
                    "code": 0,
                    "message": "Successful."
                });
            }
            res.status(200).json({
                "code": 400,
                "message": "This person has already had an account"
            });
        } catch (error) {
            console.log(error);
            res.status(200).json({
                "code": 400,
                "message": error.toString()
            });
        }
    }
}

module.exports = new Authorization();