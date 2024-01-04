const User = require("../models/user-model.js")
const UserLink = require("../models/user-link-model.js")
const { ResponseError } = require("../error/response-error.js")
const { validate } = require("../validations/validation.js")
const {
    addLinkValidation
} = require("../validations/user-link-validation.js")

const addLink = async (user, request) => {
    request = validate(addLinkValidation, request)
    
    const userLink = await UserLink.findOne({ user_id: user._id })
    if (!userLink) {
        throw new ResponseError(404, "User Links is not found")
    }

    const key = new Set(userLink.links.map(link => link.platform));
    const newLinks = request.links.map(link => {
        if (key.has(link.platform)) {
            const existingLink = userLink.links.find(existing => existing.platform === link.platform)
            return { 
                _id: existingLink._id,
                platform: link.platform,
                link: link.link
            }
        } else {
            return link
        }
    })

    const updatedLinks = userLink.links.filter(existing => !key.has(existing.platform)).concat(newLinks);

    return UserLink.findOneAndUpdate({ user_id: user._id }, { links: updatedLinks }, { new: true })
}

module.exports = {
    addLink
}