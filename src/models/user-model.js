const mongoose = require("mongoose")

const Schema = mongoose.Schema

const userSchema = new Schema({
	profile_picture: {
        type: String
    },
	name: {
		type: String,
	},
	email: {
		type: String,
        required: true,
        unique: true,
    },
	password: {
		type: String,
        required: true
    },
	is_admin: {
		type: Boolean,
		default: false
	}
})

module.exports = mongoose.model("User", userSchema)