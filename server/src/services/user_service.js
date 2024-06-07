const { User, Link } = require("../application/database.js")
const {
    registerUserBodyValidation,
    loginUserBodyValidation,
    updateUserBodyValidation,
    changePasswordUserBodyValidation
} = require("../validations/user_validation.js")
const validate = require("../validations/validation.js")
const { generateAccessToken } = require("../utils/generate_token.js")
const {
    hashPassword,
    comparePassword
} = require("../utils/password_util.js")
const ResponseError = require("../error/response_error.js")
const fs = require("fs")

const register = async (request) => {
    request = validate(registerUserBodyValidation, request)

    const emailExist = await User.findOne({ where: { email: request.email } })
    if (emailExist) {
        throw new ResponseError(400, "Email already registered")
    }

    request.password = hashPassword(request.password)

    const newUser = await User.create(request)
    await Link.create({ email: newUser.email })

    return newUser
}

const login = async (request) => {
    request = validate(loginUserBodyValidation, request)

    const user = await User.findOne({ where: { email: request.email } })
    const checkPassword = await comparePassword(request.password, user.password)
    if (!user || !checkPassword) {
        throw new ResponseError(401, "Email or password is wrong")
    }

    const accessToken = await generateAccessToken(user)
    
    return accessToken
}

const update = async (user, request) => {
    request = validate(updateUserBodyValidation, request)

    if (request.profile_picture === "delete_foto") {
        fs.unlink(`files/profile_picture/${user.profile_picture}`, err => {
            err ? 
            console.error('Error deleting previous file:', err) :
            console.log('Previous file deleted, insert new file')
        })
        request.profile_picture = null
    }

    if (request.profile_picture && user.profile_picture) {
        if (request.profile_picture !== user.profile_picture) {
            fs.unlink(`files/profile_picture/${user.profile_picture}`, err => {
                err ?
                console.error('Error deleting previous file:', err) :
                console.log('Previous file deleted, insert new file')
            })
        }
    }

    await User.update(request, { where: { id: user.id } })

    return await User.findOne({ where: { email: user.email} })
}

const changePassword = async (user, request) => {
    request = validate(changePasswordUserBodyValidation, request)

    const checkPassword = await comparePassword(request.current_password, user.password)
    if (!checkPassword) {
        throw new ResponseError(401, "Current password is wrong")
    }

    const newPassword = hashPassword(request.new_password)
    
    return await User.update(
        { password: newPassword },
        { where: { email: user.email } }
    )
}

module.exports = {
    register,
    login,
    update,
    changePassword
}