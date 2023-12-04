const { string } = require("joi");
const { Schema, model,Types, Mongoose, default: mongoose } = require("mongoose");

const toySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    img_url: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    owner_id: {
        type:mongoose.Types.ObjectId,
        ref:'user',
        required: true
    }
});

const Toy = model("Toy", toySchema);
module.exports.Toy = Toy;
