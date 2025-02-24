import axios from 'axios'

const VITE_PUBLIC_URL   ="https://messenger-server-t9po.onrender.com"
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
const createuser = async(userData) =>{
    console.log(userData);
    const response = await axios.post(`${VITE_PUBLIC_URL}/api/saveuser`,userData)
    console.log(response);
    return await response.data
}
const login = async(user)=>{
    const response = await API.post(`${VITE_PUBLIC_URL}/api/login`,user)
    console.log(response.data)
   
    if(response.data.message !=="" && response.data.token !==undefined){
        localStorage.setItem('customer',JSON.stringify(response.data))
     
    }
    return await response.data
   
}
const getUser = async(id)=>{
   const response = await API.get(`${VITE_PUBLIC_URL}/api/${id}`)
   console.log(response.data)
   return await response.data
  
}

 const forgotPassword = async(mail)=>{
    const response = await API.post(`https://server-n.onrender.com/api/forgot-password`,mail)
    return await response.data
 }

 const updateUser = async(data)=>{
   console.log(data)
    const response = await API.put(`https://server-n.onrender.com//apiuser-update`,data)
    return await response.data 
 }
 const updateSimpleUser = async(data)=>{
   console.log(data)
    const response = await API.put(`${VITE_PUBLIC_URL}/api/edit-info`,data)
    return await response.data 
 }
 const user = async(id)=>{
   console.log(id)
    const response = await API.get(`${VITE_PUBLIC_URL}/api/user/${id}`)
    return await response.data 
 }
 const resetpassword = async(data)=>{
    console.log(data)
    const response = await API.post(`https://server-n.onrender.com/api/reset-password/${data.token}`,{password:data.dataUser})
    return await response.data
 }

const getusers = async(query)=>{
   const queryString = query ? `?searchQuery=${encodeURIComponent(query)}` : '';
    const response = await API.get(`${VITE_PUBLIC_URL}/api/users${queryString}`)
    console.log(response.data )
    return await response.data
 }


const createCode = async(data)=>{
   console.log(data)
   const response = await API.post(`https://server-n.onrender.com/api/auth2f`,data)
   return response.data
}
const verification2f = async(data)=>{
   console.log(data)
   const response = await API.post(`https://server-n.onrender.com/api/verif2f`,data)

      console.log(response)
      localStorage.setItem('customer',JSON.stringify(response.data))
      return response.data
}
const verifyPassword = async(data)=>{
   console.log(data)
   const response = await API.post(`https://server-n.onrender.com/api/verify-password`,data)
   return response.data
}
const deleteUser = async(id)=>{
   console.log(id)
   const response = await API.delete(`https://server-n.onrender.com/api/delete-user/${id}`)
   return response.data
}

const activateDesactivateAccountUser = async(id)=>{
   console.log(id)
   const response = await API.post(`https://server-n.onrender.com/api/activate-desactivate-account/${id}`)
   return response.data
}
const searchUser = async (query)=>{
   const response = await API.get(`https://server-n.onrender.com/api/search?searchQuery=${query}`)
   return await response.data
}
const authServices = {
   searchUser, activateDesactivateAccountUser, user,  deleteUser,   updateSimpleUser,  verifyPassword,verification2f, createCode, getUser,createuser,login,forgotPassword,updateUser,resetpassword,getusers
}
export default authServices

