const mongoose=require("mongoose");
const {ObjectId}=mongoose.Schema.Types;

const PaymentHistory=new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: "users"
    },
    productType: {
        type: String,
    },
    quantity: {
        type: String,
    },
    costs: {
        type: Number,
    },
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
    }
});

module.exports = mongoose.model('PaymentHistory', PaymentHistory);