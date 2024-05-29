import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name:"auth",
    initialState: {
        user: localStorage.getItem('userInfo') ?
        JSON.parse(localStorage.getItem('userInfo')) : null,
        profile: {}
    },
    reducers: {
        profile(state,action) {
            state.profile = action.payload
        },
        login(state,action) {
            state.user = action.payload
        },
        logout(state) {
            state.user = null;
        },
        register(state,action) {
            state.registerMessage = action.payload
        },
    }
})

const authReducer = authSlice.reducer
const authActions = authSlice.actions

export {authReducer, authActions}