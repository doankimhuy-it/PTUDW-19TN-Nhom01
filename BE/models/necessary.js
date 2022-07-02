const mongoose=require("mongoose");
const {ObjectId}=mongoose.Schema.Types;

const Necessary = new mongoose.Schema({
    necessaryName: {
        type: String,
    },
    quantity: {
        type: Number,
    },
    price: {
        type: Number,
    },
    image: {
        type: ImageBitmap,
    },
    description: {
        type: String,
    }
});

module.exports = mongoose.model('Necessary', Necessary);