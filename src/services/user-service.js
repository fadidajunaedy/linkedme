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

const update = async (user, request) => {
    request = validate(updateUserValidation, request)
    const userInDatabase = await User.findById(user.id)
    if (!userInDatabase) {
        throw new ResponseError(404, "User is not found")
    }

    if (request.profile_picture) {
        fs.unlink(`src/assets/images/profile/${userInDatabase.profile_picture}/`, (err) => {
            if (err) {
                console.log('Previous file not found, insert new file');
            } else {
                console.log('Previous file deleted, insert new file');
            }
        })
    }
    
    return await User.findByIdAndUpdate(user.id, request, { new: true })
}

const get = async (user) => {
    const data = await User.findById(user.id)
    
    if (!data) {
        throw new ResponseError(404, "User is not found")
    }

    return data
}

const changePassword = async (user, request) => {
    request = validate(changePasswordValidation, request)

    const checkPassword = verifyPassword(request.current_password, user.password)
    if (!checkPassword) {
        throw new ResponseError(401, "Current password is not match!")
    }

    const newPassword = hashPassword(request.new_password)

    return await User.findByIdAndUpdate(user.id, { password: newPassword }, { new: true })
}

module.exports = {
    register,
    login,
    update,
    get,
    changePassword
}