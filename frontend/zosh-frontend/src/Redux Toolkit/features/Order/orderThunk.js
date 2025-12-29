import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../util/api";

export const createOrder = createAsyncThunk("order/createOrder", async (orderData, { rejectWithValue }) => {
    try {
        const response = await api.post("/api/orders", orderData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Create Order Failed: ", error);
        return rejectWithValue(error.response?.data?.message || "Failed to create order");
    }
});


export const getOrderById = createAsyncThunk("order/getOrderById", async (orderId, { rejectWithValue }) => {
    try {
        const response = await api.get(`/api/orders/${orderId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Get Order By Id Failed: ", error);
        return rejectWithValue(error.response?.data?.message || "Failed to fetch order");
    }
});

export const getOrderByCashierId = createAsyncThunk("order/getOrderByCashierId", async (cashierId, { rejectWithValue }) => {
    try {
        const response = await api.get(`/api/orders/cashier/${cashierId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Get Order By Cashier Id Failed: ", error);
        return rejectWithValue(error.response?.data?.message || "Failed to fetch order");
    }
});

export const getTodaysOrdersByBranch = createAsyncThunk("order/getTodaysOrdersByBranch", async (branchId, { rejectWithValue }) => {
    try {
        const response = await api.get(`/api/orders/today/branch/${branchId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Get Order By Branch Id Failed: ", error);
        return rejectWithValue(error.response?.data?.message || "Failed to fetch order");
    }
});

export const getOrdersByBranch = createAsyncThunk("order/getOrdersByBranch", async ({ branchId, customerId, cashierId, paymentType, status }, { rejectWithValue }) => {
    try {
        const param = [];
        if (branchId) {
            param.push(`branchId=${branchId}`);
        }
        if (customerId) {
            param.push(`customerId=${customerId}`);
        }
        if (cashierId) {
            param.push(`cashierId=${cashierId}`);
        }
        if (paymentType) {
            param.push(`paymentType=${paymentType}`);
        }
        if (status) {
            param.push(`status=${status}`);
        }
        const response = await api.get(`/api/orders/branch/${branchId}?${param.join("&")}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Get Orders By Branch Failed: ", error);
        return rejectWithValue(error.response?.data?.message || "Failed to fetch orders by branch");
    }
});

export const deleteOrder = createAsyncThunk("order/deleteOrder", async (orderId, { rejectWithValue }) => {
    try {
        await api.delete(`/api/orders/${orderId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        });
        return orderId;
    } catch (error) {
        console.log("Delete Order Failed: ", error);
        return rejectWithValue(error.response?.data?.message || "Failed to delete order");
    }
});
