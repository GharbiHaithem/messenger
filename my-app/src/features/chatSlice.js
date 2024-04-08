import { createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import chatservice from  './chatService'


const initistialState ={
chats:[],
isLoading:false,
isError:false,
isSuccess:false,
message:'',
allMychats:[]
} 
export const createChat = createAsyncThunk('/chat/create',async(dataChat,thunkAPI)=>{
    try {
       return await chatservice.createChat(dataChat)  
    } catch (error) {
      return thunkAPI.rejectWithValue(error)  
    }
})
export const chats = createAsyncThunk('/chat/user',async(thunkAPI)=>{
    try {
       return await chatservice.userChats()  
    } catch (error) {
      return thunkAPI.rejectWithValue(error)  
    }
})
export const chatSlice  = createSlice({
    name:'chat',
    initialState:initistialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(createChat.pending,(state)=>{
            state.isLoading= true
        })
        .addCase(createChat.fulfilled,(state,action)=>{
            state.isLoading  = false
            state.chats.push(action.payload);
            state.isSuccess=true
            state.message=action.payload
            console.log(action.payload)
            console.log(state.allMychats)
            
    
        })
        .addCase(createChat.rejected,(state,action)=>{
            state.isLoading  = false
            state.chats=[]
            state.isSuccess=false
            state.isError=true
            state.message=action.payload
        })
        .addCase(chats.pending,(state)=>{
            state.isLoading= true
        })
        .addCase(chats.fulfilled,(state,action)=>{
            state.isLoading  = false
            state.allMychats=action.payload
            state.isSuccess=true
            state.message=action.payload
        })
        .addCase(chats.rejected,(state,action)=>{
            state.isLoading  = false
            state.chats=[]
            state.isSuccess=false
            state.isError=true
            state.message=action.payload
        })
        
    }
})
export default chatSlice.reducer;