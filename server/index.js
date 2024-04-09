const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5001;
const bodyParser = require('body-parser');
const authRouter  = require('./router/user.route')
const chatRouter  = require('./router/chat.route')
const messageRouter  = require('./router/message.route')

const fs = require('fs');



const app = express()


app.use(cors({
    origin: 'https://messenger-1-zqtw.onrender.com/', // Remplacez ceci par l'URL de votre client React
    credentials: true,
  }));
  
app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
mongoose.connect(
    process.env.MONGO_URI , 
       
    
)
.then(()=>{

 
    console.log(`database connected succseffuly`)
}) 
.catch((err)=>{
    console.log(`error connexion in database ${err}`)
})


app.use('/api', authRouter)
app.use('/api', chatRouter)
app.use('/api', messageRouter)
app.listen(PORT, ()=>{
    console.log(`server is running at PORT ${PORT}`)
}) 