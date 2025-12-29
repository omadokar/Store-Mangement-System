import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../util/api";
import { Navigate, useNavigate } from "react-router";


export const getUser = createAsyncThunk("user/getUser", async (jwt, rejectWithValue) => {
    try {
        const response = await api.get(`/api/users/profile`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
        console.log("Get User Success: ", response.data)
        return response.data
    } catch (error) {
        console.log("Get User Failed: ", error)
        return rejectWithValue(error.response.data.message || "Something went wrong")
    }
})


export const getUserById = createAsyncThunk("user/getUserById", async (userId, rejectWithValue) => {
    try {
        const response = await api.get(`/api/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        })
        return response.data
    } catch (error) {
        console.log("Get User By Id Failed: ", error)
        return rejectWithValue(error.response.data.message || "Something went wrong")
    }
})

export const logout = createAsyncThunk("user/logout", async (_, rejectWithValue) => {
    try {
        localStorage.removeItem("jwt");
        return "Logged out successfully";
    } catch (error) {
        console.log("Logout Failed: ", error)
        return rejectWithValue("Something went wrong")
    }
})