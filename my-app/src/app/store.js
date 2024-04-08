import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../features/AuthSlices'
import chatReducer from '../features/chatSlice'
import messageReducer from '../features/messageSlice'

export const store = configureStore({
  reducer: {
  
    auth:authReducer,
   chat :chatReducer,
  message:messageReducer
  }
})
