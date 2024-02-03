import { configureStore } from "@reduxjs/toolkit";
import updateSlice from "./Slices/updateSlice";

const noteStore=configureStore({
    reducer:{
        updateReducer:updateSlice
    }
})

export default noteStore