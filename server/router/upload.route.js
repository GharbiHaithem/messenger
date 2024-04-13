const express = require('express')
const router = express.Router()
const {upload} = require('../controller/upload')
const{authMiddleware}   = require('../config/authMiddlware')
router.post('/upload' , upload)



module.exports = router