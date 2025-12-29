import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../util/api";

export const fetchCustomers = createAsyncThunk("customer/fetchCustomers", async (_, { rejectWithValue }) => {
    try {
        const response = await api.get("/api/customer", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Fetch Customers Failed: ", error);
        return rejectWithValue(error.response?.data?.message || "Failed to fetch customers");
    }
});

export const fetchCustomerById = createAsyncThunk("customer/getById", async (id, { rejectWithValue }) => {
    try {
        const response = await api.get(`/api/customer/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Get Customer Failed: ", error);
        return rejectWithValue(error.response?.data?.message || "Failed to get customer");
    }
});

export const createCustomer = createAsyncThunk("customer/createCustomer", async (customerData, { rejectWithValue }) => {
    try {
        const response = await api.post("/api/customer", customerData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Create Customer Failed: ", error);
        return rejectWithValue(error.response?.data?.message || "Failed to create customer");
    }
});

export const updateCustomer = createAsyncThunk("customer/updateCustomer", async ({ id, data }, { rejectWithValue }) => {
    try {
        const response = await api.put(`/api/customer/${id}`, data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Update Customer Failed: ", error);
        return rejectWithValue(error.response?.data?.message || "Failed to update customer");
    }
});

export const deleteCustomer = createAsyncThunk("customer/deleteCustomer", async (id, { rejectWithValue }) => {
    try {
        await api.delete(`/api/customer/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        });
        return id;
    } catch (error) {
        console.log("Delete Customer Failed: ", error);
        return rejectWithValue(error.response?.data?.message || "Failed to delete customer");
    }
});
