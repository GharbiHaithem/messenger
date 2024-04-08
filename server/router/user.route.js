const express = require('express')
const router = express.Router()
const {saveOrLoginUser,login,createUser,users} = require('../controller/userCtrl')
const { authMiddleware } = require('../config/authMiddlware')
router.get('/users',authMiddleware,users)
router.post('/save-login' , saveOrLoginUser)
router.post('/saveuser' , createUser)

router.post('/login',login)


module.exports = router