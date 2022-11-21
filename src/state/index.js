import { configureStore } from '@reduxjs/toolkit';
import posts from './postSlice';
import authSlice from './authSlice';
const store = configureStore({
 reducer: { posts, authSlice },
});

export default store;
