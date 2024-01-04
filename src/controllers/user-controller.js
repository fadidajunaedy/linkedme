const userService = require("../services/user-service.js")
const multer = require('multer')

const register = async (req, res, next) => {
    try {
        const request = req.body
        const result = await userService.register(request)
        res.status(200).json({
            message: "User Register Successfully",
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const login = async (req, res, next) => {
    try {
        const request = req.body
        const result = await userService.login(request)

        res.status(200).json({
            message: "User Login Successfully",
            data: {
                token: result
            }
        })
    } catch (e) {
        next(e)
    }
}

const update = async (req, res, next) => {
    try {
        const user = req.user
        const request = req.body
        if (req.file && req.file.filename) {
            request.profile_picture = req.file.filename
        }
        const result = await userService.update(user, request)
        res.status(200).json({
            message: "User Update Successfully",
            data: result
        })
    } catch(e) {
        next(e)
    }
}

const get = async (req, res, next) => {
    try {
        const user = req.user
        const result = await userService.get(user)
        res.status(200).json({
            message: "Get User Successfully",
            data: result
        })
    } catch(e) {
        next(e)
    }
}

const changePassword = async (req, res, next) => {
    try {
        const user = req.user
        const request = req.body
        const result = await userService.changePassword(user, request)
        res.status(200).json({
            message: "Change password successfully",
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let dir = "src/assets/images/profile/"
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null,  Date.now() + '-' + file.originalname)
    },
})
  
const upload = multer({
    storage: storage,
    limits:{fileSize: 20000000},
}).single("profile_picture")

module.exports = {
    register,
    login,
    update,
    get,
    changePassword,
    upload
}