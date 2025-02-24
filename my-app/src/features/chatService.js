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
 const createChat  =async(data)=>{
    console.log(data)
const response  = await API.post(`${VITE_PUBLIC_URL}/api/create-chat`,data)
return await response.data
}

const userChats  =async()=>{
 
const response  = await API.get(`${VITE_PUBLIC_URL}/api/user-chats`)
return await response.data
}
const chatServices ={createChat,userChats}
export default chatServices