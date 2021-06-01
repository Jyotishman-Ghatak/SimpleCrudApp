const mongoose = require("mongoose")


const Post = mongoose.model("Posts", {
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    }
})

module.exports = Post