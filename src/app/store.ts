import {
  configureStore,
  ThunkAction,
  Action,
} from '@reduxjs/toolkit';
import productSlice from '../features/product/productsSlice';
import productInfoSlice from '../features/productInfo/productInfoSlice';

export const store = configureStore({
  reducer: {
    products: productSlice,
    product: productInfoSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

/* eslint-disable @typescript-eslint/indent */
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
