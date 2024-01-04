const mongoose = require("mongoose")

const Schema = mongoose.Schema

const linkSchema = new Schema({
    platform: {
        type: String,
        required: true,
        enum: [
            "instagram",
            "youtube",
            "github", 
            "linkedin", 
            "other"]
    },
    link: {
        type: String,
        required: true
    }
})

const userLinkSchema = new Schema({
    user_id: { 
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    links: {
        type: [linkSchema],
        default: [],
        required: true
    },
})

module.exports = mongoose.model("UserLink", userLinkSchema)