import { createSlice } from "@reduxjs/toolkit";
import {
    startShift,
    endShift,
    getShiftReportById,
    getAllShiftReports,
    getShiftReportsByBranchId,
    getShiftReportsByCashierId,
    getCurrentShiftProgress,
    getShiftReportCashierAndDate
} from "./shiftReportThunk";

const initialState = {
    shiftReport: null,
    shiftReports: [],
    loading: false,
    error: null,
    currentShiftProgress: null,
};

const shiftReportSlice = createSlice({
    name: "shiftReport",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Start Shift
        builder.addCase(startShift.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(startShift.fulfilled, (state, action) => {
            state.loading = false;
            state.shiftReport = action.payload;
        });
        builder.addCase(startShift.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // End Shift
        builder.addCase(endShift.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(endShift.fulfilled, (state, action) => {
            state.loading = false;
            state.shiftReport = action.payload;
        });
        builder.addCase(endShift.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Get Shift Report By Id
        builder.addCase(getShiftReportById.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getShiftReportById.fulfilled, (state, action) => {
            state.loading = false;
            state.shiftReport = action.payload;
        });
        builder.addCase(getShiftReportById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Get All Shift Reports
        builder.addCase(getAllShiftReports.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getAllShiftReports.fulfilled, (state, action) => {
            state.loading = false;
            state.shiftReports = action.payload;
        });
        builder.addCase(getAllShiftReports.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Get Shift Reports By Branch Id
        builder.addCase(getShiftReportsByBranchId.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getShiftReportsByBranchId.fulfilled, (state, action) => {
            state.loading = false;
            state.shiftReports = action.payload;
        });
        builder.addCase(getShiftReportsByBranchId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Get Shift Reports By Cashier Id
        builder.addCase(getShiftReportsByCashierId.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getShiftReportsByCashierId.fulfilled, (state, action) => {
            state.loading = false;
            state.shiftReports = action.payload;
        });
        builder.addCase(getShiftReportsByCashierId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Get Current Shift Progress
        builder.addCase(getCurrentShiftProgress.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getCurrentShiftProgress.fulfilled, (state, action) => {
            state.loading = false;
            state.currentShiftProgress = action.payload;
        });
        builder.addCase(getCurrentShiftProgress.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Get Shift Report Cashier And Date
        builder.addCase(getShiftReportCashierAndDate.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getShiftReportCashierAndDate.fulfilled, (state, action) => {
            state.loading = false;
            state.shiftReport = action.payload;
        });
        builder.addCase(getShiftReportCashierAndDate.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export default shiftReportSlice.reducer;
