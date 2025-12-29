import { createSlice } from "@reduxjs/toolkit";
import {
    createRefund,
    getAllRefunds,
    getRefundsByCashierId,
    getRefundsByShiftReport,
    getRefundsByCashierWithinTime,
    deleteRefund
} from "./refundThunk";

const initialState = {
    refunds: [],
    loading: false,
    error: null,
};

const refundSlice = createSlice({
    name: "refund",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Create Refund
            .addCase(createRefund.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createRefund.fulfilled, (state, action) => {
                state.loading = false;
                state.refunds.push(action.payload);
            })
            .addCase(createRefund.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get All Refunds
            .addCase(getAllRefunds.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllRefunds.fulfilled, (state, action) => {
                state.loading = false;
                state.refunds = action.payload;
            })
            .addCase(getAllRefunds.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get Refunds By Cashier Id
            .addCase(getRefundsByCashierId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getRefundsByCashierId.fulfilled, (state, action) => {
                state.loading = false;
                state.refunds = action.payload;
            })
            .addCase(getRefundsByCashierId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get Refunds By Shift Report
            .addCase(getRefundsByShiftReport.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getRefundsByShiftReport.fulfilled, (state, action) => {
                state.loading = false;
                state.refunds = action.payload;
            })
            .addCase(getRefundsByShiftReport.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get Refunds By Cashier Within Time
            .addCase(getRefundsByCashierWithinTime.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getRefundsByCashierWithinTime.fulfilled, (state, action) => {
                state.loading = false;
                state.refunds = action.payload;
            })
            .addCase(getRefundsByCashierWithinTime.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Delete Refund
            .addCase(deleteRefund.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteRefund.fulfilled, (state, action) => {
                state.loading = false;
                state.refunds = state.refunds.filter((refund) => refund.id !== action.payload);
            })
            .addCase(deleteRefund.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default refundSlice.reducer;
