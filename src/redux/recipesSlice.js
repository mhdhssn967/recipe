import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch
export const fetchRecipes = createAsyncThunk('recipes/fetchRecipes', async () => {
  const response = await axios.get('https://dummyjson.com/recipes');
  return response.data.recipes;
});

const recipesSlice = createSlice({
  name: 'recipes',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
    currentPage: 1,
    recipesPerPage: 6,
    searchQuery: '', 
  },
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload; // Set search query from input
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setCurrentPage, setSearchQuery } = recipesSlice.actions;

export default recipesSlice.reducer;
