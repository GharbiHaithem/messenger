const express = require('express')
const router = express.Router()
const {addMessage,getMessages,getAllMessages} = require('../controller/message')
const{authMiddleware}   = require('../config/authMiddlware')
router.post('/create-message' ,authMiddleware, addMessage)
router.get('/messages' ,authMiddleware, getAllMessages)

router.get('/messages/:chatId' ,authMiddleware, getMessages)


module.exports = router