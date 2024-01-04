const Joi = require('joi')

const addLinkValidation = Joi.object({
    links: Joi.array().items(Joi.object()).required()
})

module.exports = {
    addLinkValidation
}