const express = require("express")
const userController = require("../controllers/user-controller.js")

const publicRouter = new express.Router()

publicRouter.post('/api/users/register', userController.register)
publicRouter.post('/api/users/login', userController.login)

module.exports = { publicRouter }