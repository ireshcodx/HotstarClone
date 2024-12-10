import { configureStore } from "@reduxjs/toolkit"
import users from './Redux/UserSlice'
import logger from 'redux-logger'
import watchList from './Redux/WatchListSlice'

export const store = configureStore({
    reducer: {
      userData:users,
      watchList:watchList
    },
    middleware:(getDefaultMiddleWare)=>getDefaultMiddleWare().concat(logger)
})