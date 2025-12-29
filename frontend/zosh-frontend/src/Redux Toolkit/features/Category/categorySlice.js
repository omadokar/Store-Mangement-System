import { createSlice } from "@reduxjs/toolkit";
import {
    createCategory,
    getCategoryByStoreId,
    updateCategoryById,
    deleteCategoryById
} from "./categoryThunk";

const initialState = {
    categories: [],
    loading: false,
    error: null,
};

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Create Category
        builder.addCase(createCategory.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(createCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.categories.push(action.payload);
        });
        builder.addCase(createCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Get Category By Store Id
        builder.addCase(getCategoryByStoreId.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getCategoryByStoreId.fulfilled, (state, action) => {
            state.loading = false;
            state.categories = action.payload;
        });
        builder.addCase(getCategoryByStoreId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Update Category By Id
        builder.addCase(updateCategoryById.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(updateCategoryById.fulfilled, (state, action) => {
            state.loading = false;
            state.categories = state.categories.map((c) =>
                c.id === action.payload.id ? action.payload : c
            );
        });
        builder.addCase(updateCategoryById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Delete Category By Id
        builder.addCase(deleteCategoryById.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(deleteCategoryById.fulfilled, (state, action) => {
            state.loading = false;
            state.categories = state.categories.filter((c) => c.id !== action.payload);
        });
        builder.addCase(deleteCategoryById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export default categorySlice.reducer;
