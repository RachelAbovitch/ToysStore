const { Schema , model , Types} = require("mongoose");

const userSchema = new Schema({
    _id: {
        type: Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
        required: true,
    }
});

const User = model("User", userSchema);
module.exports.User = User;