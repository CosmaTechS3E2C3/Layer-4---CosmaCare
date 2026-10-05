import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CosmaMobileSDK } from "../sdk/cosma";

export const fetchBookings = createAsyncThunk("bookings/fetch", async () => {
  return CosmaMobileSDK.bookings.list();
});

const bookingsSlice = createSlice({
  name: "bookings",
  initialState: { items: [], loading: false },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchBookings.pending, state => {
        state.loading = true;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      });
  }
});

export default bookingsSlice.reducer;

