const Joi = require('joi')

const registerUserValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})

const loginUserValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})

const updateUserValidation = Joi.object({
    profile_url: Joi.string().optional(),
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
})

const getUserValidation = Joi.string().required()

const changePasswordValidation = Joi.object({
    current_password: Joi.string().required(),
    new_password: Joi.string().required()
})


module.exports = {
    registerUserValidation,
    loginUserValidation,
    updateUserValidation,
    getUserValidation,
    changePasswordValidation
}