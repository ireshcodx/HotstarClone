import { createSlice } from "@reduxjs/toolkit";
import userData from "../Data/UserData";

const users=createSlice({
    name:'users',
    initialState:userData,
    reducers:{
        // addUsers(state,action){}
    }
})

export default users.reducer;  