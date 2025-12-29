import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../util/api";

export const signup = createAsyncThunk("auth/signup", async (userData, rejectWithValue) => {
    try {
        const response = await api.post("/auth/signup", userData)
        localStorage.setItem("jwt", response.data.jwt)
        console.log("Signup Succesfully: ", response.data)
        return response.data
    } catch (error) {
        console.log("Signup Failed: ", error)
        return rejectWithValue(error.response.data.message || "Something went wrong")
    }
});

export const login = createAsyncThunk("auth/login", async (userData, rejectWithValue) => {
    try {
        const response = await api.post("/auth/login", userData)
        localStorage.setItem("jwt", response.data.jwt)
        console.log("Login Succesfully: ", response.data)
        return response.data
    } catch (error) {
        console.log("Login Failed: ", error)
        return rejectWithValue(error.response.data.message || "Something went wrong")
    }
});