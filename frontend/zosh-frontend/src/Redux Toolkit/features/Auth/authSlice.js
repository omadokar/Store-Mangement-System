import { createSlice } from "@reduxjs/toolkit";
import { signup, login } from "./authThunk";


const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        isLoading: false,
        error: null
    },
    reducers: {
        logout: (state) => {
            state.user = null
            localStorage.removeItem("jwt")
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signup.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(signup.fulfilled, (state, action) => {
            state.isLoading = false
            state.user = action.payload
        })
        builder.addCase(signup.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
        builder.addCase(login.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoading = false
            state.user = action.payload
        })
        builder.addCase(login.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
    }
})

export default authSlice.reducer