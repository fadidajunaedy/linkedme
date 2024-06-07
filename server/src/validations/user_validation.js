const Joi = require('joi')

const registerUserBodyValidation = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})

const loginUserBodyValidation = Joi.object({
    email: Joi.string().email().required(),
    password:  Joi.string().required(),
})

const updateUserBodyValidation = Joi.object({
    profile_picture: Joi.string().allow(null).optional(),
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
    password:  Joi.string().optional(),
})

const changePasswordUserBodyValidation = Joi.object({
    current_password: Joi.string().required(),
    new_password: Joi.string().required()
})

module.exports = {
    registerUserBodyValidation,
    loginUserBodyValidation,
    updateUserBodyValidation,
    changePasswordUserBodyValidation,
}