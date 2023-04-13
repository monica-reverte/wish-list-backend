const { Schema, model, mongoose } = require("mongoose");

const TodoSchema = Schema({
        title: {
            tpe: String,
            required: true
        },
        body:{
            type: String,
            required: true
        },
        todoId:{
            type: String,
            required: true
        },
        completed:{
            type: Boolean,
            required: true
        },
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            },
},{timestamps: true})




module.exports = model("Todo", TodoSchema);
