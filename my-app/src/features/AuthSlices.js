import {createAction, createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import authservice from  './AuthService'

import {  toast } from 'react-toastify';
const getTokenFromStorage = JSON.parse(localStorage.getItem('customer')) 
const initistialState ={
user : getTokenFromStorage,
isError:false,
isSuccess:false,
isLoading:false,
message:'',
users:[],
isLogin:false
,wishList:[],
verifPassword:false
} 
export const registreUser = createAsyncThunk('/auth/register',async(dataUser,thunkAPI)=>{
    try {
       return await authservice.createuser(dataUser)  
    } catch (error) {
      return thunkAPI.rejectWithValue(error)  
    }
})
export const loginUser = createAsyncThunk('/auth/login',async(dataUser,thunkAPI)=>{
  try {
     return await authservice.login(dataUser)  
  } catch (error) {
    return thunkAPI.rejectWithValue(error)  
  }
})


export const forgotpassword = createAsyncThunk('/auth/forgotpassword',async(data,thunkAPI)=>{
  try {
     return await authservice.forgotPassword(data)  
  } catch (error) {
    return thunkAPI.rejectWithValue(error)  
  }
})

export const updateuser = createAsyncThunk('auth/update-user',async(data,thunkAPI)=>{
  try {
    console.log(data)
    return await authservice.updateUser(data)
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
export const updatesimpleuser = createAsyncThunk('auth/update-simple-user',async(data,thunkAPI)=>{
  try {
    console.log(data)
    return await authservice.updateSimpleUser(data)
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
export const refresh = createAsyncThunk('auth/refresh',async(thunkAPI)=>{
  try {
    return await authservice.refreshToken()
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
export const resetPassword = createAsyncThunk('auth/resetpass',async(data,thunkAPI)=>{
  try {
    console.log(data)
    return await authservice.resetpassword(data)
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
export const allusers = createAsyncThunk('auth/users',async(query,thunkAPI)=>{
  try {
 
    return await authservice.getusers(query)
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
export const activeAccount = createAsyncThunk('auth/activatedAccount',async(token,thunkAPI)=>{
  try {
 
    return await authservice.activeAccount(token)
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const createsimpleuser = createAsyncThunk('auth/create/simple/user',async(data,thunkAPI)=>{
  try {
   console.log(data)
    return await authservice.createSimpleUser(data)
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
export const codeConn = createAsyncThunk('auth/create/code/conn',async(data,thunkAPI)=>{
  try {
 
    return await authservice.createcode(data)
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
export const verifycode = createAsyncThunk('auth/code/verify',async(data,thunkAPI)=>{
  try {
 
    return await authservice.verifycode(data)
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
export const getuser = createAsyncThunk('auth/getAuser',async(id,thunkAPI)=>{
  try {
 
    return await authservice.user(id)
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
export const createA2F = createAsyncThunk('auth/auth2f',async(data,thunkAPI)=>{
  try {
 
    return await authservice.createCode(data)
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
export const verifA2F = createAsyncThunk('auth/verifA2F',async(data,thunkAPI)=>{
  try {
 
    return await authservice.verification2f(data)
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
export const verifPasswords = createAsyncThunk('auth/verify/password',async(data,thunkAPI)=>{
  try {
 
    return await authservice.verifyPassword(data)
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
export const deleteauser = createAsyncThunk('auth/delete/user',async(id,thunkAPI)=>{
  try {
 
    return await authservice.deleteUser(id)
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
export const sendEmailDetails = createAsyncThunk('auth/send/details',async(data,thunkAPI)=>{
  try {
 
    return await authservice.senddetails(data)
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
export const adau = createAsyncThunk('auth/activate/desactivate',async(id,thunkAPI)=>{
  try {
 
    return await authservice.activateDesactivateAccountUser(id)
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
export const searchUser = createAsyncThunk('search/user',async(query,thunkAPI)=>{
  try {
 
    return await authservice.searchUser(query)
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const logOut = createAction('/logout')
export const resetMessage = createAction('/resetmessage') 
export const resetVerifPassword = createAction('resetpasswordVerify')
export const authSlice = createSlice({
    name:'auth',
    initialState:initistialState,
    reducers:{},
    extraReducers:(builder)=>{
       builder.addCase(registreUser.pending,(state)=>{
        state.isLoading=true
        state.message=""
       })
       .addCase(registreUser.fulfilled,(state,action)=>{
        state.isLoading=false
        state.isSuccess=true
        state.usercreated = action.payload
        toast.success("user created successfuly")

       })
       .addCase(registreUser.rejected,(state,action)=>{
        console.log(action.payload)
        state.isLoading=false
        state.isSuccess=false
        state.isError=true
        state.message=action.payload
        toast.error(action.payload.response.data.msg)
       })
       .addCase(loginUser.pending,(state)=>{
        state.isLoading=true
       })
       .addCase(loginUser.fulfilled,(state,action)=>{
        console.log(action)
        state.isLoading=false
        state.isSuccess=true
        state.user = action.payload
        state.isLogin=true
        state.message = action.payload.message
        if(state.isSuccess){
          localStorage.setItem('token',(action.payload.token))
         toast.success("accunt logged successsfuIy")
          localStorage.setItem('customer',JSON.stringify(action.payload))
         
        }

       })
       .addCase(loginUser.rejected,(state,action)=>{
        state.isLoading=false
        state.isSuccess=false
        state.isError=true
        state.message = action.payload.response.data.message
        toast.error(action.payload.response.data.message)
        state.isLogin=false
        state.user=null
       })
      
       .addCase(forgotpassword.pending,(state)=>{
        state.isLoading=true
       })
       .addCase(forgotpassword.fulfilled,(state,action)=>{
        console.log(action)
        state.isLoading=false
        state.isSuccess=true
        state.forgotpassword = action.payload
         state.message=action.payload.message
        state.isLogin=false
     
    

       })
       .addCase(forgotpassword.rejected,(state,action)=>{
        state.isLoading=false
        state.isSuccess=false
        state.isError=true
        state.message=action.payload.response.data.message
    
      
       })
       .addCase(updateuser.pending,(state)=>{
        state.isLoading=true
       })
       .addCase(updateuser.fulfilled,(state,action)=>{
        console.log(action)
        state.isLoading=false
        state.isSuccess=true
        state.user = action.payload.userUpdated
          state.message=action.payload.message
        state.isLogin=true
     
    

       })
       .addCase(updateuser.rejected,(state,action)=>{
        state.isLoading=false
        state.isSuccess=false
        state.isError=true
        state.message=action.error
    
      
       })
       .addCase(updatesimpleuser.pending,(state)=>{
        state.isLoading=true
       })
       .addCase(updatesimpleuser.fulfilled,(state,action)=>{
        console.log(action.payload)
        state.isLoading=false
        state.isSuccess=true
       state.userupdated = action.payload
          state.message=action.payload.message
        state.isLogin=true
        localStorage.setItem('customer',JSON.stringify(action.payload))
     
    

       })
       .addCase(updatesimpleuser.rejected,(state,action)=>{
        state.isLoading=false
        state.isSuccess=false
        state.isError=true
        state.message=action.error
    
      
       })
       .addCase(resetPassword.pending,(state)=>{
        state.isLoading=true
       })
       .addCase(resetPassword.fulfilled,(state,action)=>{
        console.log(action)
        state.isLoading=false
        state.isSuccess=true
        state.resetpassword = action.payload.user
         state.message=action.payload.message
        state.isLogin=true
     
    

       })
       .addCase(resetPassword.rejected,(state,action)=>{
        state.isLoading=false
        state.isSuccess=false
        state.isError=true
        state.message=action.payload.response.data.message
    
      
       })
       .addCase(allusers.pending,(state)=>{
        state.isLoading=true
       })
       .addCase(allusers.fulfilled,(state,action)=>{
        console.log(action)
        state.isLoading=false
        state.isSuccess=true
        state.users = action.payload
        
        state.isLogin=false
     
    

       })
       .addCase(allusers.rejected,(state)=>{
        state.isLoading=false
        state.isSuccess=false
        state.isError=true
       
    
      
       })
       .addCase(logOut,(state)=>{
        state.isLogin = false
        state.user={}
        state.message = ""
        localStorage.removeItem("customer");
        localStorage.removeItem("token");

       })
       .addCase(resetMessage,(state)=>{
        
        state.message = ""
        
       })
       .addCase(resetVerifPassword,(state)=>{
        state.verifPassword = false
       })
       .addCase(activeAccount.pending,(state)=>{
        state.isLoading=true
       })
       .addCase(activeAccount.fulfilled,(state,action)=>{
        console.log(action)
        state.isLoading=false
        state.isSuccess=true
        state.infosAccount = action.payload
         state.message=action.payload
        state.isLogin=true
     
    

       })
       .addCase(activeAccount.rejected,(state,action)=>{
        state.isLoading=false
        state.isSuccess=false
        state.isError=true
        state.message=action.payload.response.data.message
    
      
       })
       .addCase(createsimpleuser.pending,(state)=>{
        state.isLoading=true
        state.message=""
       })
       .addCase(createsimpleuser.fulfilled,(state,action)=>{
        console.log(action.payload)
        state.isLoading=false
        state.isSuccess=true
        state.users = [action.payload.newUser]
        //  state.message = action.payload.message
        toast.success('ADD USER SUCCESSFULY')
       })
       .addCase(createsimpleuser.rejected,(state,action)=>{
        console.log(action.payload)
        state.isLoading=false
        state.isSuccess=false
        state.isError=true
        state.message=action.payload.response.data.message
       })
       .addCase(codeConn.pending,(state)=>{
        state.isLoading=true
        state.message=""
       })
       .addCase(codeConn.fulfilled,(state,action)=>{
        console.log(action.payload)
        state.isLoading=false
        state.isSuccess=true
        state.user = action.payload
        //  state.message = action.payload.message

       })
       .addCase(codeConn.rejected,(state,action)=>{
        console.log(action.payload)
        state.isLoading=false
        state.isSuccess=false
        state.isError=true
        state.message=action.payload
       })
       .addCase(verifycode.pending,(state)=>{
        state.isLoading=true
        state.message=""
       })
       .addCase(verifycode.fulfilled,(state,action)=>{
        console.log(action.payload)
        state.isLoading=false
        state.isSuccess=true
        state.verifcodeconnexion = action.payload
        state.verifcodeconnexion.verified = true
        //  state.message = action.payload.message

       })
       .addCase(verifycode.rejected,(state,action)=>{
        console.log(action.payload)
        state.isLoading=false
        state.isSuccess=false
        state.isError=true
        state.verified = false
        state.message=action.payload.response.data.message
       })
       .addCase(getuser.pending,(state)=>{
        state.isLoading=true
        state.message=""
       })
       .addCase(getuser.fulfilled,(state,action)=>{
        console.log(action.payload)
        state.isLoading=false
        state.isSuccess=true
        state.user = action.payload
        state.verified = true
       

       })
       .addCase(getuser.rejected,(state,action)=>{
        console.log(action.payload)
        state.isLoading=false
        state.isSuccess=false
        state.isError=true
      
        state.message=action.payload.response.data.message
       })
       .addCase(createA2F.pending,(state)=>{
        state.isLoading=true
        state.message=""
       })
       .addCase(createA2F.fulfilled,(state,action)=>{
        console.log(action.payload)
        state.isLoading=false
        state.isSuccess=true
        state.codeA2F = action.payload.updateuser
        state.message = action.payload.message
       

       })
       .addCase(createA2F.rejected,(state,action)=>{
        console.log(action.payload)
        state.isLoading=false
        state.isSuccess=false
        state.isError=true
      
        state.message=action.payload.response.data.message
       })
       .addCase(verifA2F.pending,(state)=>{
        state.isLoading=true
        state.message=""
        state.isError= false
        state.verifiedCode2f = false
       })
       .addCase(verifA2F.fulfilled,(state,action)=>{
        console.log(action.payload)
        state.isLoading=false
        state.isSuccess=true
        state.isError = false
        state.verifA2f = action.payload.user
        state.message = action.payload.message
        state.user = action.payload.user
       state.isLogin = true
       state.verifiedCode2f = true

       })
       .addCase(verifA2F.rejected,(state,action)=>{
        console.log(action.payload)
        state.isLoading=false
        state.isSuccess=false
        state.isError=true
        state.verifiedCode2f = false
        state.message=action.payload.response.data.message

       })
       .addCase(verifPasswords.pending,(state)=>{
        state.isLoading=true
        state.message=""
        state.isError= false
        state.verifPassword = false
       })
       .addCase(verifPasswords.fulfilled,(state,action)=>{
        console.log(action.payload)
        state.isLoading=false
        state.isSuccess=true
        state.isError = false
       state.isLogin = true
       state.verifPassword = true
       

       })
       .addCase(verifPasswords.rejected,(state,action)=>{
        console.log(action.payload)
        state.isLoading=false
        state.isSuccess=false
        state.isError=true
        state.verifPassword = false
        state.message = "Echec Current Password Incorect"
       })
       .addCase(deleteauser.pending,(state)=>{
        state.isLoading=true
        state.message=""
        state.isError= false
      
       })
       .addCase(deleteauser.fulfilled,(state,action)=>{
        console.log(action.payload)
        state.isLoading=false
        state.isSuccess=true
        state.isError = false
       state.isLogin = true
       state.userdeleted = action.payload
       toast.error('DELETED SUCCESSFULY')

       })
       .addCase(deleteauser.rejected,(state,action)=>{
        console.log(action.payload)
        state.isLoading=false
        state.isSuccess=false
        state.isError=true
       
        state.message = "user deleted"
       })
       .addCase(sendEmailDetails.pending,(state)=>{
        state.isLoading=true
        state.message=""
        state.isError= false
      
       })
       .addCase(sendEmailDetails.fulfilled,(state,action)=>{
        console.log(action.payload)
        state.isLoading=false
        state.isSuccess=true
        state.isError = false
       state.isLogin = true
       state.emailSend = true
       toast.success(action.payload.message)

       })
       .addCase(sendEmailDetails.rejected,(state,action)=>{
        console.log(action.payload)
        state.isLoading=false
        state.isSuccess=false
        state.isError=true
       
      
       })
       .addCase(adau.pending,(state)=>{
        state.isLoading=true
        state.message=""
        state.isError= false
      
       })
       .addCase(adau.fulfilled,(state,action)=>{
        console.log(action.payload)
        state.isLoading=false
        state.isSuccess=true
        state.isError = false
       state.isLogin = true
       state.activateAccount = action.payload.active
       if(action.payload.active === true){
        toast.success(action.payload.message)
       }else{
        toast.error(action.payload.message)
       }
       

       })
       .addCase(adau.rejected,(state,action)=>{
        console.log(action.payload)
        state.isLoading=false
        state.isSuccess=false
        state.isError=true
       
      
       })
       .addCase(searchUser.pending,(state)=>{
        state.isLoading=true
        state.message=""
        state.isError= false
      
       })
       .addCase(searchUser.fulfilled,(state,action)=>{
        console.log(action.payload)
        state.isLoading=false
        state.isSuccess=true
        state.isError = false
       state.isLogin = true
       state.allUsers = action.payload
     
       

       })
       .addCase(searchUser.rejected,(state,action)=>{
        console.log(action.payload)
        state.isLoading=false
        state.isSuccess=false
        state.isError=true
       
      
       })
      
       
    }

})
export default authSlice.reducer;