const express = require('express')
const app = express()
app.use(express.static('public')); 
const io = require('socket.io')(8900,
   { cors:{
        origin:"http://localhost:5173"
    
    },})

    let users= []
    const adduser = (userId,socketId)=>{
    return  !users.some(user=>user.userId === userId) &&
    users.push({userId,socketId})
    }
    const removeuser = (socketId)=>{
  users= users.filter((user)=>user?.socketId !== socketId)
    }
    const getUser = (userId)=>{
        return users.find((user)=>user?.userId === userId)
      
    }
io.on("connection",(socket)=>{
  socket.on('test', (data) => {
    console.log('Événement "test" reçu avec les données:', data);

    // Envoyer une réponse au client
    io.emit('response', data);
});
console.log("a user cnnected")
socket.on("adduser",userId=>{
    adduser(userId,socket.id)
    io.emit("getuser",users)
})
socket.on("sendMessage",({receiveId,data})=>{
    console.log({receiveId})
    console.log({data})
  const user = getUser(receiveId)
  console.log({userrr:user})
  if(user)
   {
   
     io.to(user.socketId).emit("getMessage" , {data})}
   
})
socket.on("sendMessage1",(userId)=>{
    console.log(userId)
   const user =  getUser(userId)
   console.log(user?.socketId)
   if(user){
    io.to(user.socketId).emit("getMessageConversation")
 
    
   }
   
})
socket.on('audioMessage', (audioData) => {
    // Sauvegarder le fichier audio sur le serveur
    const fileName = `public/audio_${Date.now()}.webm`;
    fs.writeFileSync(fileName, Buffer.from(audioData.blob, 'base64'));
    console.log(`Fichier audio enregistré: ${fileName}`);

    // Vous pouvez faire d'autres traitements ici (transmettre à d'autres utilisateurs, etc.)
  })
socket.on("disconnect", () => {
    removeuser(socket.id);
    io.emit("getuser", users);
});
})

