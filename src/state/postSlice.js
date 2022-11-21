import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
 records: [],
 loading: false,
 error: null,
 record: {},
};

export const fetchposts = createAsyncThunk(
 //name or type
 'posts/fetchposts',
 //call back fn, : 1 > for callbacl
 async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;

  try {
   const res = await fetch(`http://localhost:5000/posts`);
   const data = await res.json();
   // data as callback
   return data;
  } catch (error) {
   rejectWithValue(error.message);
  }
 }
);

export const fetchPost = createAsyncThunk(
 'posts/fetchpost',
 async (id, syncAPI) => {
  const { rejectWithValue } = syncAPI;

  try {
   const res = await fetch(`http://localhost:5000/posts/${id}`);
   const data = await res.json();
   return data;
  } catch (error) {
   rejectWithValue(error.message);
  }
 }
);

//delete posts
export const deletePost = createAsyncThunk(
 'posts/deletepost',
 async (id, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
   await fetch(`http://localhost:5000/posts/${id}`, {
    method: 'DELETE',
   });

   return id;
  } catch (error) {
   rejectWithValue(error.value);
  }
 }
);

// add posts
export const addPost = createAsyncThunk(
 'post/addpost',
 async (data, asyncAPI) => {
  const { rejectWithValue, getState } = asyncAPI;

  const { authSlice } = getState();

  data.userId = authSlice.id;

  try {
   const res = await fetch('http://localhost:5000/posts', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
     'content-type': 'application/json; charset=UTF-8',
    },
   });
   const fetchdata = await res.json();
   return fetchdata;
  } catch (error) {
   rejectWithValue(error.message);
  }
 }
);

export const editPost = createAsyncThunk(
 'posts/editPost',
 async (item, asyncAPI) => {
  const { rejectWithValue } = asyncAPI;
  try {
   const res = await fetch(`http://localhost:5000/posts/${item.id}`, {
    method: 'PATCH',
    body: JSON.stringify(item),
    headers: {
     'content-type': 'application/json; charset=UTF-8',
    },
   });

   const data = await res.json();
   return data;
  } catch (error) {
   rejectWithValue(error.message);
  }
 }
);

const postSlice = createSlice({
 name: 'post',
 initialState,
 reducers: {},
 extraReducers: {
  // fetch data
  [fetchposts.pending]: (state, action) => {
   state.loading = true;
   state.error = null;
  },
  [fetchposts.rejected]: (state, action) => {
   state.loading = false;
   state.error = action.payload;
  },
  [fetchposts.fulfilled]: (state, action) => {
   state.loading = false;
   state.records = action.payload;
  },

  //deleteposts

  [deletePost.pending]: (state) => {
   state.loading = true;
   state.error = null;
  },

  [deletePost.fulfilled]: (state, action) => {
   state.loading = false;
   state.records = state.records.filter((ele) => ele.id !== action.payload);
  },

  [deletePost.rejected]: (state, action) => {
   state.loading = false;
   state.error = action.payload;
  },

  // addpost

  [addPost.pending]: (state, action) => {
   state.loading = true;
   state.error = null;
  },
  [addPost.fulfilled]: (state, action) => {
   state.loading = false;

   state.records = state.records.push(action.payload);
  },
  [addPost.rejected]: (state, action) => {
   state.loading = false;
   state.error = action.payload;
  },

  //fetch post

  [fetchPost.pending]: (state, action) => {
   state.loading = true;
   state.error = null;
   state.record = null;
  },

  [fetchPost.fulfilled]: (state, action) => {
   state.loading = false;
   //one record > not all
   state.record = action.payload;
  },

  [fetchPost.rejected]: (state, action) => {
   state.loading = false;
   state.error = action.payload;
  },

  //edit Post
  [editPost.pending]: (state, action) => {
   state.loading = true;
   state.error = null;
  },
  [editPost.fulfilled]: (state, action) => {
   state.loading = false;
   state.record = action.payload;
  },
  [editPost.rejected]: (state, action) => {
   state.loading = false;
   state.error = action.payload;
  },
 },
});

export default postSlice.reducer;
