import {configureStore } from '@reduxjs/toolkit'
import contentSlice from './contentSlice.js'




let store = configureStore({
    reducer: {
        content: contentSlice.reducer
    } 
})


export const contentSliceActions = contentSlice.actions
export default store