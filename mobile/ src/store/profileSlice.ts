import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CosmaMobileSDK } from "../sdk/cosma";

export const fetchProfile = createAsyncThunk(
  "profile/fetch",
  async (address: string) => {
    return CosmaMobileSDK.profiles.get(address);
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: { data: null, loading: false },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProfile.pending, state => {
        state.loading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      });
  }
});

export default profileSlice.reducer;

