const mongoose=require("mongoose");
const {ObjectId}=mongoose.Schema.Types;

const Users=new mongoose.Schema({
    fullname: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        enum: ["user", "admin", "manager"],
    },
    phoneNumber: {
        type: String,
    },
    address: {
        type: String,
    },
    dayOfBirth: {
        day: {
            type: Number,
        },
        month: {
            type: Number,
        }, 
        year: {
            type: Number,
        }
    },
    balance: {
        type: Number,
    },
    paymentHistory: [
        {
            type: ObjectId,
            ref: "PaymentHistory",
        }
    ],
    gender: {
        type: String,
        enum: ["MALE", "FEMALE"]
    },
    idNumber: {
        type: String,
    },
    medicalCenter: {
        type: String,
    },        
    history: [
        {
            time: {
                day: {
                    type: Number,
                },
                month: {
                    type: Number,
                },
                year: {
                    type: Number,
                }
            },
            status: {
                type: String, 
                enum: ["F0", "F1", "F2", "F3"]
            },
            medicalCenter: {
                type: String,
            }
        }
    ],
    status: {
        type: String,
        enum: ["F0", "F1", "F2", "F3"]
    }

});

module.exports = mongoose.model('Users', Users);