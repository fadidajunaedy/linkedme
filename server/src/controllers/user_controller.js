const userService = require("../services/user_service.js")
const multer = require("multer")

const register = async (req, res, next) => {
    try {
        const request = req.body
        const result = await userService.register(request)
        res.status(200).json({
            success: true,
            message: "User register success",
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
            success: true,
            message: "User login success",
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
        if (req.files) {
            // profile_picture
            if (req.files.profile_picture) {
                request.profile_picture = req.files.profile_picture[0].filename;
            }
        }
        const result = await userService.update(user, request)
        res.status(200).json({
            success: true,
            message: "User update success",
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const get = async (req, res, next) => {
    try {
        const user = req.user
        res.status(200).json({
            success: true,
            message: "Get data success",
            data: user
        })
    } catch (e) {
        next(e)
    }
}

const changePassword = async (req, res, next) => {
    try {
        const user = req.user
        const request = req.body
        await userService.changePassword(user, request)
        res.status(200).json({
            success: true,
            message: "Change password success"
        })
    } catch (e) {
        next(e)
    }
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let dir = `files/profile_picture/`
        cb(null, dir)
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
})
  
const upload = multer({
    storage: storage,
    limits:{fileSize: 20000000},
}).fields([
    { name: 'profile_picture', maxCount: 1 }, 
])

module.exports = {
    register,
    login,
    update,
    get,
    changePassword,
    upload
}
