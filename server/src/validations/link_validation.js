const Joi = require('joi')

const linkBodyValidation = Joi.object({
    links: Joi.array().required(),
})

module.exports = {
    linkBodyValidation
}