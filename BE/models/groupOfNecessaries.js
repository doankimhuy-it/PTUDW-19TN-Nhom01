const mongoose=require("mongoose");
const {ObjectId}=mongoose.Schema.Types;

const groupOfNecessaries = new mongoose.Schema({
    groupName: {
        type: String,
    },
    groupQuantity: {
        type: Number,
    },
    price: {
        type: Number,
    },
    necessariesList: [
        {
            name: {
                type: String,
            },
            quantity: {
                type: Number,
            }
        }
    ]
});

module.exports = mongoose.model("GroupOfNecessaries", groupOfNecessaries);