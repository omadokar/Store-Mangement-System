import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../util/api";

export const createRefund = createAsyncThunk("refund/createRefund", async (refundData, { rejectWithValue }) => {
    try {
        const response = await api.post("/api/refund", refundData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Create Refund Failed: ", error);
        return rejectWithValue(error.response?.data?.message || "Failed to create refund");
    }
});

export const getAllRefunds = createAsyncThunk("refund/getAllRefunds", async (_, { rejectWithValue }) => {
    try {
        const response = await api.get("/api/refund", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Get All Refunds Failed: ", error);
        return rejectWithValue(error.response?.data?.message || "Failed to fetch refunds");
    }
});

export const getRefundsByCashierId = createAsyncThunk("refund/getRefundsByCashierId", async (cashierId, { rejectWithValue }) => {
    try {
        const response = await api.get(`/api/refund/branch/${cashierId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Get Refunds By Cashier Id Failed: ", error);
        return rejectWithValue(error.response?.data?.message || "Failed to fetch refunds by cashier");
    }
});

export const getRefundsByShiftReport = createAsyncThunk("refund/getRefundsByShiftReport", async (shiftReportId, { rejectWithValue }) => {
    try {
        const response = await api.get(`/api/refund/shift/${shiftReportId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Get Refunds By Shift Report Failed: ", error);
        return rejectWithValue(error.response?.data?.message || "Failed to fetch refunds by shift report");
    }
});

export const getRefundsByCashierWithinTime = createAsyncThunk("refund/getRefundsByCashierWithinTime", async ({ cashierId, startDate, endDate }, { rejectWithValue }) => {
    try {
        const response = await api.get(`/api/refund/cashier/${cashierId}/range?startDate=${startDate}&endDate=${endDate}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Get Refunds By Cashier Within Time Failed: ", error);
        return rejectWithValue(error.response?.data?.message || "Failed to fetch refunds by cashier within time");
    }
});

export const deleteRefund = createAsyncThunk("refund/deleteRefund", async (refundId, { rejectWithValue }) => {
    try {
        await api.delete(`/api/refund/${refundId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        });
        return refundId;
    } catch (error) {
        console.log("Delete Refund Failed: ", error);
        return rejectWithValue(error.response?.data?.message || "Failed to delete refund");
    }
});
