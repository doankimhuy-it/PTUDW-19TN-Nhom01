const mongoose=require("mongoose");
const {ObjectId}=mongoose.Schema.Types;

const Users=new mongoose.Schema({
    username: {
        type: String,
    },
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
    ]

});

module.exports = mongoose.model('Users', Users);