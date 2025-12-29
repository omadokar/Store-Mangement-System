import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../util/api";

export const createStore = createAsyncThunk("store/createStore", async (storeData, { rejectWithValue }) => {
    try {
        const response = await api.post("/api/store", storeData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Create Store Failed: ", error);
        return rejectWithValue(error.response?.data?.message || "Failed to create store");
    }
});

export const getAllStores = createAsyncThunk("store/getAllStores", async (_, { rejectWithValue }) => {
    try {
        const response = await api.get("/api/store", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Get All Stores Failed: ", error);
        return rejectWithValue(error.response?.data?.message || "Failed to fetch stores");
    }
});

export const getStoreByAdmin = createAsyncThunk("store/getStoreByAdmin", async (_, { rejectWithValue }) => {
    try {
        const response = await api.get("/api/store/admin", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Get Store By Admin Failed: ", error);
        return rejectWithValue(error.response?.data?.message || "Failed to fetch store by admin");
    }
});

export const getStoreByEmployee = createAsyncThunk("store/getStoreByEmployee", async (_, { rejectWithValue }) => {
    try {
        const response = await api.get("/api/store/employee", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Get Store By Employee Failed: ", error);
        return rejectWithValue(error.response?.data?.message || "Failed to fetch store by employee");
    }
});

export const updateStore = createAsyncThunk("store/updateStore", async ({ id, storeData }, { rejectWithValue }) => {
    try {
        const response = await api.put(`/api/store/${id}`, storeData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Update Store Failed: ", error);
        return rejectWithValue(error.response?.data?.message || "Failed to update store");
    }
});

export const deleteStore = createAsyncThunk("store/deleteStore", async (id, { rejectWithValue }) => {
    try {
        await api.delete(`/api/store/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        });
    } catch (error) {
        console.log("Delete Store Failed: ", error);
        return rejectWithValue(error.response?.data?.message || "Failed to delete store");
    }
});

export const moderateStore = createAsyncThunk("store/moderateStore", async ({ id, status }, { rejectWithValue }) => {
    try {
        const response = await api.put(`/api/store/${id}/moderate?status=${status}`, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Moderate Store Failed: ", error);
        return rejectWithValue(error.response?.data?.message || "Failed to moderate store");
    }
});

export const getStoreById = createAsyncThunk("store/getStoreById", async (id, { rejectWithValue }) => {
    try {
        const response = await api.get(`/api/store/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Get Store By Id Failed: ", error);
        return rejectWithValue(error.response?.data?.message || "Failed to fetch store");
    }
});
