import { createSlice } from "@reduxjs/toolkit"
import { fetchUserProfile, updateUserProfile } from "./profilePageApi"


const initialState = {
    user: [],
    state: 'idel'
}

export const profilePageSlice = createSlice({
    name: 'profilePage',
    initialState: {
        user: []
    },
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchUserProfile.pending, (state) => {
                state.state = "loading";
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.state = "sucessfull";
                state.user = action.payload;
            })
            .addCase(updateUserProfile.pending, (state) => {
                state.state = "loading";
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.state = "SucessFull";
                state.user = action.payload;
            });
            
    }
})


export const getUserProfile = (state) => state.profilePage.user
console.log((state) => state.user);

export default profilePageSlice.reducer;