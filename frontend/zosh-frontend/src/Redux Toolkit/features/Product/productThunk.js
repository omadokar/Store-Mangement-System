import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../util/api";

export const createProduct = createAsyncThunk("product/createProduct", async (productData, { rejectWithValue }) => {
    try {
        const response = await api.post("/api/products", productData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Create Product Failed: ", error);
        return rejectWithValue(error.response?.data?.message || "Failed to create product");
    }
});

export const getProductById = createAsyncThunk("product/getProductById", async (id, { rejectWithValue }) => {
    try {
        const response = await api.get(`/api/products/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Get Product By Id Failed: ", error);
        return rejectWithValue(error.response?.data?.message || "Failed to fetch product");
    }
});

export const updateProduct = createAsyncThunk("product/updateProduct", async ({ id, productData }, { rejectWithValue }) => {
    try {
        const response = await api.put(`/api/products/${id}`, productData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Update Product Failed: ", error);
        return rejectWithValue(error.response?.data?.message || "Failed to update product");
    }
});

export const deleteProduct = createAsyncThunk("product/deleteProduct", async (id, { rejectWithValue }) => {
    try {
        await api.delete(`/api/products/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        });
        return id;
    } catch (error) {
        console.log("Delete Product Failed: ", error);
        return rejectWithValue(error.response?.data?.message || "Failed to delete product");
    }
});

export const getProductsByStoreId = createAsyncThunk("product/getProductsByStoreId", async (storeId, { rejectWithValue }) => {
    try {
        const response = await api.get(`/api/products/store/${storeId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Get Products By Store Id Failed: ", error);
        return rejectWithValue(error.response?.data?.message || "Failed to fetch products by store");
    }
});

export const searchProducts = createAsyncThunk("product/searchProducts", async ({ storeId, keyword }, { rejectWithValue }) => {
    try {
        const response = await api.get(`/api/products/search/${storeId}/search?keyword=${keyword}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Search Products Failed: ", error);
        return rejectWithValue(error.response?.data?.message || "Failed to search products");
    }
});
