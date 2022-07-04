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
            necessaryId: {
                type: ObjectId,
                ref: "Necessary"
            },
            quantity: {
                type: Number,
            }
        }
    ]
});

module.exports = mongoose.model("GroupOfNecessaries", groupOfNecessaries);