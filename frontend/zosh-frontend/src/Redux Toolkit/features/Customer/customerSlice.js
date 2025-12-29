import { createSlice } from "@reduxjs/toolkit";
import { fetchCustomers, createCustomer, updateCustomer, deleteCustomer, fetchCustomerById } from "./customerThunk";

const initialState = {
    customers: [],
    customer: null,
    loading: false,
    error: null,
};

const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Customers
            .addCase(fetchCustomers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCustomers.fulfilled, (state, action) => {
                state.loading = false;
                state.customers = action.payload;
            })
            .addCase(fetchCustomers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Create Customer
            .addCase(createCustomer.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCustomer.fulfilled, (state, action) => {
                state.loading = false;
                state.customers.push(action.payload);
            })
            .addCase(createCustomer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Update Customer
            .addCase(updateCustomer.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCustomer.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.customers.findIndex((c) => c.id === action.payload.id);
                if (index !== -1) {
                    state.customers[index] = action.payload;
                }
            })
            .addCase(updateCustomer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Delete Customer
            .addCase(deleteCustomer.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCustomer.fulfilled, (state, action) => {
                state.loading = false;
                state.customers = state.customers.filter((c) => c.id !== action.payload);
            })
            .addCase(deleteCustomer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //getById
            .addCase(fetchCustomerById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCustomerById.fulfilled, (state, action) => {
                state.loading = false;
                state.customer = action.payload;
            })
            .addCase(fetchCustomerById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default customerSlice.reducer;
