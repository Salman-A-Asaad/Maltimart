import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../../supabase/supabase";

const initialState = {
  allProducts: [],
  status: "idle",
  error: null,
};

export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async () => {
    const { data, error } = await supabase.from("products").select("*");
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allProducts = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
