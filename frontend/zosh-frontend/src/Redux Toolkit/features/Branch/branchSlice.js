import { createSlice } from "@reduxjs/toolkit";
import {
    createBranch,
    updateBranch,
    deleteBranch,
    getBranchById,
    getAllBranchesByStoreId
} from "./branchThunk";

const initialState = {
    branches: [],
    branch: null,
    loading: false,
    error: null,
};

const branchSlice = createSlice({
    name: "branch",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Create Branch
        builder.addCase(createBranch.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(createBranch.fulfilled, (state, action) => {
            state.loading = false;
            state.branch = action.payload;
            state.branches.push(action.payload);
        });
        builder.addCase(createBranch.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Update Branch
        builder.addCase(updateBranch.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(updateBranch.fulfilled, (state, action) => {
            state.loading = false;
            state.branch = action.payload;
            state.branches = state.branches.map((b) =>
                b.id === action.payload.id ? action.payload : b
            );
        });
        builder.addCase(updateBranch.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Delete Branch
        builder.addCase(deleteBranch.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(deleteBranch.fulfilled, (state, action) => {
            state.loading = false;
            state.branches = state.branches.filter((b) => b.id !== action.payload);
        });
        builder.addCase(deleteBranch.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Get Branch By Id
        builder.addCase(getBranchById.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getBranchById.fulfilled, (state, action) => {
            state.loading = false;
            state.branch = action.payload;
        });
        builder.addCase(getBranchById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Get All Branches By Store Id
        builder.addCase(getAllBranchesByStoreId.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getAllBranchesByStoreId.fulfilled, (state, action) => {
            state.loading = false;
            state.branches = action.payload;
        });
        builder.addCase(getAllBranchesByStoreId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export default branchSlice.reducer;
