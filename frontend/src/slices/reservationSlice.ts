import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  loading: false,
  pickupLocation: "",
  dropoffLocation: "",
  pickupDate: "",
  pickupTime: "",
  dropoffDate: "",
  dropoffTime: "",
  errors: ""
};

export const vehicleReserve = createAsyncThunk(
  "reservation/submitReservation",
  async (reservationData, { rejectWithValue }) => {
    try {
        const response = await axios.post('/api/reservations', reservationData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Reservation Failed"
      );
    }
  }
);

const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
     setReservationData(state, action) {
      return { ...state, ...action.payload };
    },
    resetReservationData() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
    .addCase(vehicleReserve.pending, (state) => {
      state.loading = true;
      state.error = "";
    })
    .addCase(vehicleReserve.fulfilled, (state,action) => {
        state.loading = false;
    })
    .addCase(vehicleReserve.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })
  },
});

export const { setReservationData, resetReservationData } = reservationSlice.actions;
export default reservationSlice.reducer;