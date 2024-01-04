const jwt = require("jsonwebtoken")
const User = require("../models/user-model.js")
const { ResponseError } = require("../error/response-error.js")
const { 
    hashPassword, 
    verifyPassword 
} = require("../utils/password-util.js")
const { tokenSign } = require("../utils/token-util.js")
const { validate } = require("../validations/validation.js")
const {
    registerUserValidation,
    loginUserValidation,
    updateUserValidation,
    getUserValidation,
    changePasswordValidation
} = require("../validations/user-validation.js")

const register = async (request) => {
    request= validate(registerUserValidation, request)

    const emailExist = await User.findOne({ email: request.email })
    if (emailExist) {
        throw new ResponseError(400, "Email already registered")
    }

    request.password = hashPassword(request.password)

    const newUser = await User.create(request)
    
    return newUser
}

const login = async (request) => {
    request= validate(loginUserValidation, request)

    const user = await User.findOne({ email: request.email })
    if (!user) {
        throw new ResponseError(400, "Email or password is wrong")
    }

    const checkPassword = verifyPassword(request.password, user.password)
    if (!checkPassword) {
        throw new ResponseError(401, "Email or password is wrong")
    }

    return await tokenSign(user)
}

module.exports = {
    register,
    login
}