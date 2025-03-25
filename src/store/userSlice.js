import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name:"user",
    initialState:null,
    reducers:{
        setUser:(state,action)=>{
            return action.payload;
        },
        removeUser:(state)=>{
            return null;
        }
    }
});

export const {setUser,removeUser} = userSlice.actions;
export default userSlice.reducer;