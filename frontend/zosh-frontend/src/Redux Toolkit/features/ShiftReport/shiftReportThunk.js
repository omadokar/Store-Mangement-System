import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../util/api";

export const startShift = createAsyncThunk("shiftReport/startShift", async (_, { rejectWithValue }) => {
    try {
        const response = await api.post("/api/shift-report/start", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Start Shift Failed: ", error);
        return rejectWithValue(error.response?.data?.message || "Failed to start shift");
    }
});

export const endShift = createAsyncThunk("shiftReport/endShift", async (_, { rejectWithValue }) => {
    try {
        const response = await api.patch("/api/shift-report/end", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("End Shift Failed: ", error);
        return rejectWithValue(error.response?.data?.message || "Failed to end shift");
    }
});

export const getShiftReportById = createAsyncThunk("shiftReport/getShiftReportById", async (id, { rejectWithValue }) => {
    try {
        const response = await api.get(`/api/shift-report/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Get Shift Report By Id Failed: ", error);
        return rejectWithValue(error.response?.data?.message || "Failed to fetch shift report");
    }
});

export const getAllShiftReports = createAsyncThunk("shiftReport/getAllShiftReports", async (_, { rejectWithValue }) => {
    try {
        const response = await api.get("/api/shift-report/all", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Get All Shift Reports Failed: ", error);
        return rejectWithValue(error.response?.data?.message || "Failed to fetch all shift reports");
    }
});

export const getShiftReportsByBranchId = createAsyncThunk("shiftReport/getShiftReportsByBranchId", async (branchId, { rejectWithValue }) => {
    try {
        const response = await api.get(`/api/shift-report/branch/${branchId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Get Shift Reports By Branch Id Failed: ", error);
        return rejectWithValue(error.response?.data?.message || "Failed to fetch shift reports by branch");
    }
});

export const getShiftReportsByCashierId = createAsyncThunk("shiftReport/getShiftReportsByCashierId", async (cashierId, { rejectWithValue }) => {
    try {
        const response = await api.get(`/api/shift-report/cashier/${cashierId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Get Shift Reports By Cashier Id Failed: ", error);
        return rejectWithValue(error.response?.data?.message || "Failed to fetch shift reports by cashier");
    }
});

export const getCurrentShiftProgress = createAsyncThunk("shiftReport/getCurrentShiftProgress", async (cashierId, { rejectWithValue }) => {
    try {
        const response = await api.get(`/api/shift-report/current-progress/${cashierId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Get Current Shift Progress Failed: ", error);
        return rejectWithValue(error.response?.data?.message || "Failed to fetch current shift progress");
    }
});

export const getShiftReportCashierAndDate = createAsyncThunk("shiftReport/getShiftReportCashierAndDate", async ({ cashierId, date }, { rejectWithValue }) => {
    try {
        const response = await api.get(`/api/shift-report/cashier/${cashierId}/date/${date}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Get Shift Report Cashier And Date Failed: ", error);
        return rejectWithValue(error.response?.data?.message || "Failed to fetch shift report by cashier and date");
    }
});
