import { configureStore } from '@reduxjs/toolkit';
import products from '../reducer/products';

const store = configureStore({
    reducer: {
        products
    },
    devTools: true
})

export default store;