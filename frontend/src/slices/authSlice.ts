import {createSlice , createAsyncThunk} from '@reduxjs/toolkit'
import { registerUserAPI, loginUserAPI } from '../api/authAPI'

export const registerUser:any = createAsyncThunk(
    'auth/register',
    async (userData:any,{ rejectWithValue }) => {
        try {
           const response = await registerUserAPI(userData);
           return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const loginUser = createAsyncThunk(
    'auth/login',
    async (userData:any,{ rejectWithValue }) => {
        try {
            const response = await loginUserAPI(userData);
            return response
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

const authSlice = createSlice({
    name:'auth',
    initialState:{
        user: null,
        token: null,
        loading: false,
        error: null
    },
    reducers:{
        logout:(state)=>{
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
        }
    },
    extraReducers(builder) {
        builder
        .addCase(registerUser.pending, (state )=> {
            state.loading = true;
        })
        .addCase(registerUser.fulfilled, (state,action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem('token',action.payload.token);
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            // state.error = action.payload;
        })
        .addCase(loginUser.pending, ( state ) => {
            state.loading = true;
        })
        .addCase(loginUser.fulfilled, ( state, action ) => {
            state.loading = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem('token',action.payload.token);
         })
        .addCase(loginUser.rejected, ( state,action ) => {
            state.loading = true;
            // state.error = action.payload;
        })
    },
})

export const {logout} = authSlice.actions;
export default authSlice.reducer;