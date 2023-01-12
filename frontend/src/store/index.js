import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../reducers/cartReducer';
import categoryReducer from '../reducers/categoryReducer'
import productReducer from '../reducers/productReducer';
import authSlice from '../reducers/auth/authSlice';

export const store = configureStore({
    reducer: {
        change: categoryReducer,
        product: productReducer,
        cart: cartReducer,
        auth: authSlice,
    }
});