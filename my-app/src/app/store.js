import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../features/AuthSlices'
import chatReducer from '../features/chatSlice'
import messageReducer from '../features/messageSlice'
import uploadReducer from '../features/uploadSlice'
export const store = configureStore({
  reducer: {
  
    auth:authReducer,
   chat :chatReducer,
  message:messageReducer,
  upload:uploadReducer
  }
})
