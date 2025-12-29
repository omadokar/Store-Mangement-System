import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../util/api";

export const createCategory = createAsyncThunk("category/createCategory", async (categoryData, { rejectWithValue }) => {
    try {
        const response = await api.post("/api/category", categoryData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Create Category Failed: ", error);
        return rejectWithValue(error.response?.data?.message || "Failed to create category");
    }
});

export const getCategoryByStoreId = createAsyncThunk("category/getCategoryByStoreId", async (storeId, { rejectWithValue }) => {
    try {
        const response = await api.get(`/api/category/${storeId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Get Category By Store Id Failed: ", error);
        return rejectWithValue(error.response?.data?.message || "Failed to fetch categories");
    }
});

export const updateCategoryById = createAsyncThunk("category/updateCategoryById", async ({ id, categoryData }, { rejectWithValue }) => {
    try {
        const response = await api.put(`/api/category/${id}`, categoryData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Update Category By Id Failed: ", error);
        return rejectWithValue(error.response?.data?.message || "Failed to update category");
    }
});

export const deleteCategoryById = createAsyncThunk("category/deleteCategoryById", async (id, { rejectWithValue }) => {
    try {
        await api.delete(`/api/category/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return id;
    } catch (error) {
        console.log("Delete Category By Id Failed: ", error);
        return rejectWithValue(error.response?.data?.message || "Failed to delete category");
    }
});
