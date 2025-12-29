import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../util/api";

export const createStoreEmployee = createAsyncThunk("employee/createStoreEmployee", async ({ storeId, employeeData }, { rejectWithValue }) => {
    try {
        const response = await api.post(`/api/employee/store/${storeId}`, employeeData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Create Store Employee Failed: ", error);
        return rejectWithValue(error.response?.data?.message || "Failed to create store employee");
    }
});

export const createBranchEmployee = createAsyncThunk("employee/createBranchEmployee", async ({ branchId, employeeData }, { rejectWithValue }) => {
    try {
        const response = await api.post(`/api/employee/branch/${branchId}`, employeeData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Create Branch Employee Failed: ", error);
        return rejectWithValue(error.response?.data?.message || "Failed to create branch employee");
    }
});

export const updateEmployee = createAsyncThunk("employee/updateEmployee", async ({ employeeId, employeeData }, { rejectWithValue }) => {
    try {
        const response = await api.put(`/api/employee/${employeeId}`, employeeData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Update Employee Failed: ", error);
        return rejectWithValue(error.response?.data?.message || "Failed to update employee");
    }
});

export const deleteEmployee = createAsyncThunk("employee/deleteEmployee", async (employeeId, { rejectWithValue }) => {
    try {
        await api.delete(`/api/employee/${employeeId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        });
        return employeeId;
    } catch (error) {
        console.log("Delete Employee Failed: ", error);
        return rejectWithValue(error.response?.data?.message || "Failed to delete employee");
    }
});

export const getAllEmployeesByStoreId = createAsyncThunk("employee/getAllEmployeesByStoreId", async ({ storeId, role }, { rejectWithValue }) => {
    try {
        const response = await api.get(`/api/employee/store/${storeId}?role=${role}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Get All Employees By Store Id Failed: ", error);
        return rejectWithValue(error.response?.data?.message || "Failed to fetch store employees");
    }
});

export const getAllEmployeesByBranchId = createAsyncThunk("employee/getAllEmployeesByBranchId", async ({ branchId, role }, { rejectWithValue }) => {
    try {
        const response = await api.get(`/api/employee/branch/${branchId}?role=${role}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Get All Employees By Branch Id Failed: ", error);
        return rejectWithValue(error.response?.data?.message || "Failed to fetch branch employees");
    }
});

export const getAllEmployees = createAsyncThunk("employee/getAllEmployees", async (_, { rejectWithValue }) => {
    try {
        const response = await api.get(`/api/employee/all`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Get All Employees Failed: ", error);
        return rejectWithValue(error.response?.data?.message || "Failed to fetch employees");
    }
});
