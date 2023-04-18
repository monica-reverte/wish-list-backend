const mongoose = require("mongoose");

const { Schema } = mongoose;

const todoSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        required: true,
        default: false,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true });




module.exports = mongoose.model("Todo", todoSchema);
