// src/redux/slices/cartSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_REACT_APP_API_URL;

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const res = await axios.get(`${API}/api/cart`, { withCredentials: true });
  return res.data.cart;
});

export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async ({ foodId, quantity }, { rejectWithValue }) => {
      try {
        const response = await axios.post(
          `${API}/api/cart`,
          { foodId, quantity },
          { withCredentials: true }
        );
        return response.data; // optionally return response if needed
      } catch (err) {
        return rejectWithValue(err.response?.data?.message || err.message);
      }
    }
  );
  

export const updateQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ foodId, quantity }) => {
    await axios.put(`${API}/api/cart/update/${foodId}`, { foodId, quantity }, { withCredentials: true });
    return { foodId, quantity };
  }
);

export const selectCartCount = (state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
  

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (foodId) => {
    await axios.delete(`${API}/api/cart/remove/${foodId}`, { withCredentials: true });
    return foodId;
    
  }
);

export const applyCoupon = createAsyncThunk(
  "cart/applyCoupon",
  async ({ code, orderAmount, userId }) => {
    const res = await axios.post(
      `${API}/api/coupons/validate`,
      { code, orderAmount, userId },
      { withCredentials: true }
    );
    return res.data;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalAmount: 0,
    loading: false,
    discount: 0,
    finalAmount: 0,
  },
  reducers: {
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.discount = 0;
      state.finalAmount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.totalAmount = action.payload.totalAmount;
        state.finalAmount = action.payload.totalAmount;
      })
      .addCase(applyCoupon.fulfilled, (state, action) => {
        state.discount = action.payload.discount;
        state.finalAmount = action.payload.finalAmount;
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state) => {
        state.loading = false;
        // Optionally you can trigger fetchCart again or update items here
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        console.error("Add to Cart Error:", action.payload);
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        const { foodId, quantity } = action.payload;
        const item = state.items.find((item) => item.food._id === foodId);
        if (item) {
          item.quantity = quantity;
        }
      
        // Optionally recalculate totalAmount and finalAmount
        state.totalAmount = state.items.reduce((acc, item) => acc + item.food.price * item.quantity, 0);
        state.finalAmount = state.totalAmount - state.discount;
      })

      .addCase(removeCartItem.fulfilled, (state, action) => {
        const foodId = action.payload;
        state.items = state.items.filter((item) => item.food._id !== foodId);
      
        // Recalculate totals
        state.totalAmount = state.items.reduce((acc, item) => acc + item.food.price * item.quantity, 0);
        state.finalAmount = state.totalAmount - state.discount;
      })

  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
