import { createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import messageservice from  './messageService'


const initistialState ={
messages:[],
isLoading:false,
isError:false,
isSuccess:false,
message:'',

} 
export const createmessage = createAsyncThunk('/create/message',async(data,thunkAPI)=>{
    try {
        console.log(data)
       return await messageservice.createmessage(data)  
    } catch (error) {
      return thunkAPI.rejectWithValue(error)  
    }
})
export const messages = createAsyncThunk('/message',async(chatId,thunkAPI)=>{
    try {
       return await messageservice.messages(chatId)  
    } catch (error) {
      return thunkAPI.rejectWithValue(error)  
    }
})

export const allMessages = createAsyncThunk('/messages',async(thunkAPI)=>{
    try {
       return await messageservice.allmessages()  
    } catch (error) {
      return thunkAPI.rejectWithValue(error)  
    }
})
export const messageSlice  = createSlice({
    name:'message',
    initialState:initistialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(messages.pending,(state)=>{
            state.isLoading= true
        })
        .addCase(messages.fulfilled,(state,action)=>{
            state.isLoading  = false
            
            state.isSuccess=true
            state.messages=action.payload
          
            
    
        })
        .addCase(messages.rejected,(state,action)=>{
            state.isLoading  = false
            state.messages=[]
            state.isSuccess=false
            state.isError=true
            state.message=action.payload
        })
        .addCase(allMessages.pending,(state)=>{
            state.isLoading= true
        })
        .addCase(allMessages.fulfilled,(state,action)=>{
            state.isLoading  = false
            console.log(action.payload)
            state.isSuccess=true
            state.messages=action.payload
          
            
    
        })
        .addCase(allMessages.rejected,(state,action)=>{
            state.isLoading  = false
            state.messages=[]
            state.isSuccess=false
            state.isError=true
            state.message=action.payload
        })
        .addCase(createmessage.pending,(state)=>{
            state.isLoading= true
        })
        .addCase(createmessage.fulfilled,(state,action)=>{
            state.isLoading  = false
            console.log(action.payload)
            state.isSuccess=true
            state.messages.push(action.payload)
         
            
    
        })
        .addCase(createmessage.rejected,(state,action)=>{
            state.isLoading  = false
            state.messages=[]
            state.isSuccess=false
            state.isError=true
            state.message=action.payload
        })
         
        
    }
})
export default messageSlice.reducer;