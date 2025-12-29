import { createSlice } from "@reduxjs/toolkit";
import {
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct,
    getProductsByStoreId,
    searchProducts
} from "./productThunk";

const initialState = {
    products: [],
    product: null,
    loading: false,
    error: null,
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Create Product
        builder.addCase(createProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(createProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.product = action.payload;
            state.products.push(action.payload);
        });
        builder.addCase(createProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Get Product By Id
        builder.addCase(getProductById.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getProductById.fulfilled, (state, action) => {
            state.loading = false;
            state.product = action.payload;
        });
        builder.addCase(getProductById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Update Product
        builder.addCase(updateProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(updateProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.product = action.payload;
            state.products = state.products.map((p) =>
                p.id === action.payload.id ? action.payload : p
            );
        });
        builder.addCase(updateProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Delete Product
        builder.addCase(deleteProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.products = state.products.filter((p) => p.id !== action.payload);
        });
        builder.addCase(deleteProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Get Products By Store Id
        builder.addCase(getProductsByStoreId.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getProductsByStoreId.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
        });
        builder.addCase(getProductsByStoreId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Search Products
        builder.addCase(searchProducts.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(searchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
        });
        builder.addCase(searchProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export default productSlice.reducer;
