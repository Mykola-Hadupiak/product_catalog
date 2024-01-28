/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getProducts } from '../../api/api';
import { Product } from '../../types/Product';

export interface ProductsState {
  products: Product[];
  // product: Product | null;
  favourites: Product[];
  cart: Product[];
  search: string,
  error: boolean,
  loading: boolean,
}

const initialState: ProductsState = {
  products: [],
  // product: null,
  favourites: JSON.parse(localStorage.getItem('favourites') || '[]'),
  cart: JSON.parse(localStorage.getItem('cart') || '[]'),
  search: '',
  error: false,
  loading: false,
};

export const thunkGetProducts = createAsyncThunk(
  'products/fetchProducts', () => {
    return getProducts();
  },
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // setProduct: (state, action: PayloadAction<Product>) => {
    //   state.product = action.payload;
    // },
    // setProductNull: (state) => {
    //   state.product = null;
    // },
    addToFavourites: (state, action: PayloadAction<Product>) => {
      state.favourites.push(action.payload);
    },
    removeFavourite: (state, action: PayloadAction<Product>) => {
      state.favourites = state.favourites
        .filter(favoutire => favoutire.id !== action.payload.id);
    },
    addToCart: (state, action: PayloadAction<Product>) => {
      state.cart.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<Product>) => {
      const copy = [...state.cart].reverse();
      const index = copy.findIndex(item => item.id === action.payload.id);

      copy.splice(index, 1);

      state.cart = [...copy].reverse();
    },
    removeProduct: (state, action: PayloadAction<Product>) => {
      state.cart = state.cart
        .filter(item => item.id !== action.payload.id);
    },
    clearCart: (state) => {
      state.cart = [];
    },
    addSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    removeSearch: (state) => {
      state.search = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(thunkGetProducts.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(thunkGetProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.products = action.payload;
          state.loading = false;
        })
      .addCase(thunkGetProducts.rejected, (state) => {
        state.error = true;
      });
  },
});

export const {
  // setProduct,
  // setProductNull,
  addToFavourites,
  removeFavourite,
  addToCart,
  removeFromCart,
  addSearch,
  removeSearch,
  clearCart,
  removeProduct,
} = productsSlice.actions;

export default productsSlice.reducer;
