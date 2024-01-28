/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getProductsInfo } from '../../api/api';
import { ProductInfo } from '../../types/ProductInfo';

export interface ProductInfoState {
  product: ProductInfo | null;
  error: boolean,
  loading: boolean,
}

const initialState: ProductInfoState = {
  product: null,
  error: false,
  loading: false,
};

export const thunkGetProduct = createAsyncThunk(
  'product/fetchProduct', async (
    { id, name }: { id: string, name: string },
    { rejectWithValue },
  ) => {
    try {
      const productInfo = await getProductsInfo(id, name);

      return productInfo;
    } catch (error) {
      return rejectWithValue('Failed to fetch product');
    }
  },
);

const productInfoSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    removeProduct: (state) => {
      state.product = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(thunkGetProduct.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(thunkGetProduct.fulfilled,
        (state, action) => {
          state.product = action.payload || null;
          state.loading = false;
        })
      .addCase(thunkGetProduct.rejected, (state) => {
        state.error = true;
      });
  },
});

export const {
  removeProduct,
} = productInfoSlice.actions;

export default productInfoSlice.reducer;
