const express = require('express')
const router = express.Router()
const {createChat , userChats , findChat} = require('../controller/chatCtrl')
const{authMiddleware}   = require('../config/authMiddlware')
router.post('/create-chat' ,authMiddleware, createChat)
router.get('/user-chats' , authMiddleware,userChats)
router.get('/chat/:firstId/:secondId' , authMiddleware,findChat)


module.exports = router