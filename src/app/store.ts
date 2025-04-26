import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/authSlice'
import apiSlice from '../services/apiSlice'
import metaReducer from '../features/metaSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    meta: metaReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        
        ignoredActions: [
          'api/executeMutation/fulfilled',
        ],
        
        ignoredPaths: ['payload'], 
      },
    }).concat(apiSlice.middleware),
  devTools: true,
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch