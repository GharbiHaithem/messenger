const Chat = require('../model/chat')
const chatCtrl  ={
    createChat: async (req, res) => {
        try {
            const { senderId, receivedId } = req.body;
    
            // Vérifier si une conversation existe entre les deux utilisateurs
            const existingChat = await Chat.findOne({
                $or: [
                    {
                        members: {
                            $elemMatch: { senderId, receivedId }
                        }
                    },
                    {
                        members: {
                            $elemMatch: { senderId: receivedId, receivedId: senderId }
                        }
                    }
                ]
            });
    
            if (existingChat) {
                // Une conversation existe déjà, renvoyer cette conversation
                res.status(200).json({message:"existe chat ",existingChat});
            } else {
                // Aucune conversation existante, créer une nouvelle conversation
                const newChat = new Chat({
                    members: [{ senderId, receivedId }]
                });
                
                await newChat.save();
                res.status(200).json(newChat);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },
    
    userChats: async (req, res) => {
        try {
            const { _id } = req.user;
            const chats = await Chat.find({
                $or: [
                    { 'members.senderId': _id },
                    { 'members.receivedId': _id }
                ]
            }).populate('members.senderId members.receivedId');
            
            res.status(201).json(chats);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    ,
    
    
    findChat:async(req,res)=>{
        try {
        const findChat = await Chat.findOne({members: {$all : [req.params.firstId,req.params.secondId]}})   
        res.status(201).json(findChat) 
        } catch (error) {
            res.status(500).json(error)
        }
    }
}
module.exports = chatCtrl