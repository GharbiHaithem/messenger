import axios from 'axios'

const VITE_PUBLIC_URL   ="http://localhost:5001"
// https://messenger-server-t9po.onrender.com
const API = axios.create({baseURL:VITE_PUBLIC_URL});
API.interceptors.request.use((req)=>{
   if(localStorage.getItem('customer')){
    req.headers.authorization =`Bearer ${
        JSON.parse(localStorage.getItem("customer")).token
    }`
   }
   return req;
})
 const createmessage  =async(data)=>{
    console.log(data)
const response  = await API.post(`${VITE_PUBLIC_URL}/api/create-message`,data)
return await response.data
}

const messages  =async(chatId)=>{
 
const response  = await API.get(`${VITE_PUBLIC_URL}/api/messages/${chatId}`)
return await response.data
}

const allmessages  =async()=>{
 
    const response  = await API.get(`${VITE_PUBLIC_URL}/api/messages`)
    return await response.data
    }
const messagesServices ={createmessage,messages,allmessages}
export default messagesServices