const mongoose = require('mongoose')
const chatSchema  = new mongoose.Schema({
    members: [{
        senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        receivedId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    }]
},{
    timestamps:true
})
module.exports =mongoose.model('Chat',chatSchema)