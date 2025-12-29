import { createSlice } from "@reduxjs/toolkit";
import { createOrder, getOrderById, deleteOrder, getOrderByCashierId, getTodaysOrdersByBranch, getOrdersByBranch } from "./orderThunk";

const initialState = {
    orders: [],
    currentOrder: null,
    loading: false,
    error: null,
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        clearOrderState: (state) => {
            state.currentOrder = null;
            state.error = null;
            state.loading = false;
        }
    },
    extraReducers: (builder) => {
        builder
            // Create Order
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.orders.push(action.payload);
                state.currentOrder = action.payload;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Get Order By Id
            .addCase(getOrderById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getOrderById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentOrder = action.payload;
            })
            .addCase(getOrderById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Delete Order
            .addCase(deleteOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = state.orders.filter(order => order.id !== action.payload);
                if (state.currentOrder && state.currentOrder.id === action.payload) {
                    state.currentOrder = null;
                }
            })
            .addCase(deleteOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get Order By Cashier Id
            .addCase(getOrderByCashierId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getOrderByCashierId.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(getOrderByCashierId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get Orders By Branch
            .addCase(getOrdersByBranch.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getOrdersByBranch.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(getOrdersByBranch.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get Orders By Branch
            .addCase(getTodaysOrdersByBranch.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTodaysOrdersByBranch.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(getTodaysOrdersByBranch.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export const { clearOrderState } = orderSlice.actions;
export default orderSlice.reducer;
