import { createSlice } from "@reduxjs/toolkit";
import {
    createStoreEmployee,
    createBranchEmployee,
    updateEmployee,
    deleteEmployee,
    getAllEmployeesByStoreId,
    getAllEmployeesByBranchId,
    getAllEmployees
} from "./employeeThunk";

const initialState = {
    employees: [],
    loading: false,
    error: null,
};

const employeeSlice = createSlice({
    name: "employee",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Create Store Employee
        builder.addCase(createStoreEmployee.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(createStoreEmployee.fulfilled, (state, action) => {
            state.loading = false;
            state.employees.push(action.payload);
        });
        builder.addCase(createStoreEmployee.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Create Branch Employee
        builder.addCase(createBranchEmployee.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(createBranchEmployee.fulfilled, (state, action) => {
            state.loading = false;
            state.employees.push(action.payload);
        });
        builder.addCase(createBranchEmployee.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Update Employee
        builder.addCase(updateEmployee.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(updateEmployee.fulfilled, (state, action) => {
            state.loading = false;
            state.employees = state.employees.map((e) =>
                e.id === action.payload.id ? action.payload : e
            );
        });
        builder.addCase(updateEmployee.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Delete Employee
        builder.addCase(deleteEmployee.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(deleteEmployee.fulfilled, (state, action) => {
            state.loading = false;
            state.employees = state.employees.filter((e) => e.id !== action.payload);
        });
        builder.addCase(deleteEmployee.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Get All Employees By Store Id
        builder.addCase(getAllEmployeesByStoreId.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getAllEmployeesByStoreId.fulfilled, (state, action) => {
            state.loading = false;
            state.employees = action.payload;
        });
        builder.addCase(getAllEmployeesByStoreId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Get All Employees By Branch Id
        builder.addCase(getAllEmployeesByBranchId.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getAllEmployeesByBranchId.fulfilled, (state, action) => {
            state.loading = false;
            state.employees = action.payload;
        });
        builder.addCase(getAllEmployeesByBranchId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Get All Employees
        builder.addCase(getAllEmployees.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getAllEmployees.fulfilled, (state, action) => {
            state.loading = false;
            state.employees = action.payload;
        });
        builder.addCase(getAllEmployees.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export default employeeSlice.reducer;
