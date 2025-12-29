import { createSlice } from "@reduxjs/toolkit";
import { getUser, getUserById, logout } from "./userThunk";

const initialState = {
    user: [],
    userProfile: null,
    selectedUser: null,
    loading: false,
    error: null
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        clearUserState: (state) => {
            state.userProfile = null;
            state.selectedUser = null;
            state.loading = false;
            state.error = null;
            state.user = [];
        }
    },
    extraReducers: (builder) => {
        // getUser
        builder
            .addCase(getUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // getUserById
            .addCase(getUserById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedUser = action.payload;
            })
            .addCase(getUserById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(logout.fulfilled, (state) => {
                state.userProfile = null;
                state.selectedUser = null;
                state.error = null;
            })
    }
});

export default userSlice.reducer;
