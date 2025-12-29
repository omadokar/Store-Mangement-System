import { createSlice } from "@reduxjs/toolkit";
import {
    createStore,
    getAllStores,
    getStoreByAdmin,
    getStoreByEmployee,
    updateStore,
    deleteStore,
    moderateStore,
    getStoreById
} from "./storeThunk";

const initialState = {
    stores: [],
    store: null,
    loading: false,
    error: null,
};

const storeSlice = createSlice({
    name: "store",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Create Store
        builder.addCase(createStore.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(createStore.fulfilled, (state, action) => {
            state.loading = false;
            state.store = action.payload;
            state.stores.push(action.payload);
        });
        builder.addCase(createStore.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Get All Stores
        builder.addCase(getAllStores.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getAllStores.fulfilled, (state, action) => {
            state.loading = false;
            state.stores = action.payload;
        });
        builder.addCase(getAllStores.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Get Store By Admin
        builder.addCase(getStoreByAdmin.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getStoreByAdmin.fulfilled, (state, action) => {
            state.loading = false;
            state.store = action.payload;
        });
        builder.addCase(getStoreByAdmin.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Get Store By Employee
        builder.addCase(getStoreByEmployee.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getStoreByEmployee.fulfilled, (state, action) => {
            state.loading = false;
            state.store = action.payload;
        });
        builder.addCase(getStoreByEmployee.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Update Store
        builder.addCase(updateStore.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(updateStore.fulfilled, (state, action) => {
            state.loading = false;
            state.store = action.payload;
            state.stores = state.stores.map((s) =>
                s.id === action.payload.id ? action.payload : s
            );
        });
        builder.addCase(updateStore.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Delete Store
        builder.addCase(deleteStore.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(deleteStore.fulfilled, (state, action) => {
            state.loading = false;
            state.stores = state.stores.filter((s) => s.id !== action.payload);
        });
        builder.addCase(deleteStore.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Moderate Store
        builder.addCase(moderateStore.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(moderateStore.fulfilled, (state, action) => {
            state.loading = false;
            state.store = action.payload;
            state.stores = state.stores.map((s) =>
                s.id === action.payload.id ? action.payload : s
            );
        });
        builder.addCase(moderateStore.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Get Store By Id
        builder.addCase(getStoreById.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getStoreById.fulfilled, (state, action) => {
            state.loading = false;
            state.store = action.payload;
        });
        builder.addCase(getStoreById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export default storeSlice.reducer;
