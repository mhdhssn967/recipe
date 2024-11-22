import { configureStore } from '@reduxjs/toolkit';
import recipesReducer from './recipesSlice';

export const appStore = configureStore({
  reducer: {
    recipes: recipesReducer
  }
});
