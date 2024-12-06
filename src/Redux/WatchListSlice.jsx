import { createSlice } from "@reduxjs/toolkit";
import watchListData from "../Data/WatchListData";


const watchList=createSlice({
    name:'watchList',
    initialState:watchListData,
    reducers:{
        addMovieToWatchList(state,action){
            state.push(action.payload);
        }
    }
})

export const {addMovieToWatchList}=watchList.actions
export default watchList.reducer;  