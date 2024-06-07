const { User, Link } = require("../application/database.js")
const { linkBodyValidation } = require("../validations/link_validation.js")
const validate = require("../validations/validation.js")
const checkDuplicateKeys = require("../utils/check_duplicate_keys.js")
const ResponseError = require("../error/response_error.js")

const create = async (user, request) => {
    request.email = user.email
    request.links = JSON.stringify(request.links)

    const newLink = await Link.create(request)

    return newLink
}

const update = async (user, request) => {
    const link = await Link.findOne({ where: { email: user.email } })
    if (!link) {
        throw new ResponseError(404, "User's Link is not found")
    }

    let duplicateKeys = checkDuplicateKeys(request.links)
    if (duplicateKeys) {
        throw new ResponseError(401, `Duplicate platform found: ${duplicateKeys}`)
    }
    
    request.links = JSON.stringify(request.links)
    
    await Link.update(request, { where: { email: user.email } })
    const updatedLink = await Link.findOne({ where: { email: user.email} })

    updatedLink.links = JSON.parse(updatedLink.links)

    return await updatedLink

}

const get = async (user) => {
    const link = await Link.findOne({ where: { email: user.email } })
    if (!link) {
        throw new ResponseError(404, "Link is not found")
    }

    link.links = JSON.parse(link.links)

    return link
}

module.exports = {
    create,
    update,
    get
}