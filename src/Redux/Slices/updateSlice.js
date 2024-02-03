import { createSlice } from "@reduxjs/toolkit";

const updateReducer = createSlice({
    name: "update",
    initialState: false,
    reducers: {
        switchUpdate:(state)=>{
            return !state
        },
    }

})

export const { switchUpdate } = updateReducer.actions
export default updateReducer.reducer
