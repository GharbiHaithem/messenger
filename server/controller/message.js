const Message  =require('../model/message')
const messageCtrl ={
    addMessage : async (req, res) => {
        const { chatId, senderId, text } = req.body;
        const message = new Message({
          chatId,
          senderId,
          text,
        });
        try {
          const result = await message.save();
          res.status(200).json(result);
        } catch (error) {
          res.status(500).json(error);
        }
      },
      getMessages : async (req, res) => {
        const { chatId } = req.params;
        try {
          const result = await Message.find({ chatId });
          res.status(200).json(result);
        } catch (error) {
          res.status(500).json(error);
        }
      },
    getAllMessages:async(req,res)=>{
        try {
            const messages  =await Message.find().populate('chatId senderId')
            console.log(messages)
            res.status(200).json(messages)
        } catch (error) {
            res.status(200).json(error)
        }
    }  
}
module.exports =messageCtrl