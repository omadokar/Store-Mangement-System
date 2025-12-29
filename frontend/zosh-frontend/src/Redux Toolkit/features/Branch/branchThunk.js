import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../util/api";

export const createBranch = createAsyncThunk("branch/createBranch", async (branchData, { rejectWithValue }) => {
    try {
        const response = await api.post("/api/branch", branchData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Create Branch Failed: ", error);
        return rejectWithValue(error.response?.data?.message || "Failed to create branch");
    }
});

export const updateBranch = createAsyncThunk("branch/updateBranch", async ({ id, branchData }, { rejectWithValue }) => {
    try {
        const response = await api.put(`/api/branch/${id}`, branchData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Update Branch Failed: ", error);
        return rejectWithValue(error.response?.data?.message || "Failed to update branch");
    }
});

export const deleteBranch = createAsyncThunk("branch/deleteBranch", async (id, { rejectWithValue }) => {
    try {
        await api.delete(`/api/branch/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        });
        return id;
    } catch (error) {
        console.log("Delete Branch Failed: ", error);
        return rejectWithValue(error.response?.data?.message || "Failed to delete branch");
    }
});

export const getBranchById = createAsyncThunk("branch/getBranchById", async (id, { rejectWithValue }) => {
    try {
        const response = await api.get(`/api/branch/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Get Branch By Id Failed: ", error);
        return rejectWithValue(error.response?.data?.message || "Failed to fetch branch");
    }
});

export const getAllBranchesByStoreId = createAsyncThunk("branch/getAllBranchesByStoreId", async (storeId, { rejectWithValue }) => {
    try {
        const response = await api.get(`/api/branch/store/${storeId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Get All Branches By Store Id Failed: ", error);
        return rejectWithValue(error.response?.data?.message || "Failed to fetch branches by store");
    }
});
