import { createSlice } from "@reduxjs/toolkit";
import blogServices from "../services/blogs";

const blog = createSlice({
  name: "blog",
  initialState: {
    blogList: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchBlogListStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    fetchBlogListSuccess: (state, action) => {
      state.loading = false;
      state.blogList = action.payload;
    },
    fetchBlogListFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createBlog(state, action) {
      state.loading = false;
      state.blogList = state.blogList.concat(action.payload);
    },
    removeBlog(state, action) {
      state.loading = false;
      state.blogList = state.blogList.filter(
        (blog) => blog.id !== action.payload,
      );
    },
    upBlog(state, action) {
      state.loading = false;
      state.blogList = state.blogList.map((blog) =>
        blog.id !== action.payload.id ? blog : action.payload,
      );
    },
  },
});

export const fetchBlogList = () => {
  return async (dispatch) => {
    try {
      const response = await blogServices.getAll();
      dispatch(fetchBlogListSuccess(response));
    } catch (error) {
      dispatch(fetchBlogListFailure(error.message));
    }
  };
};

export const addBlogList = (blog) => {
  return async (dispatch) => {
    try {
      const resp = await blogServices.create(blog);
      dispatch(createBlog(resp));
    } catch (error) {
      dispatch(fetchBlogListFailure(error.message));
    }
  };
};
export const deleteBlog = (id) => {
  return async (dispatch) => {
    try {
      await blogServices.remove(id);
      dispatch(removeBlog(id));
    } catch (error) {
      dispatch(fetchBlogListFailure(error.message));
    }
  };
};
export const updateBlog = (id, blog) => {
  return async (dispatch) => {
    try {
      const updatedBlog = {
        ...blog,
        likes: Number(blog.likes) + 1,
        user: blog.user.id,
      };
      const resp = await blogServices.update(id, updatedBlog);
      const newBlog = { ...resp, user: blog.user };
      dispatch(upBlog(newBlog));
    } catch (error) {
      dispatch(fetchBlogListFailure(error.message));
    }
  };
};

export const addComment = (blog, comment) => {
  return async (dispatch) => {
    try {
      const updatedBlog = {
        ...blog,
        comments: blog.comments.concat(comment),
        user: blog.user.id,
      };
      const resp = await blogServices.update(blog.id, updatedBlog);
      const newBlog = { ...resp, user: blog.user };
      console.log(newBlog);
      dispatch(upBlog(newBlog));
    } catch (error) {
      dispatch(fetchBlogListFailure(error.message));
    }
  };
};

export const {
  fetchBlogListStart,
  fetchBlogListSuccess,
  fetchBlogListFailure,
  createBlog,
  removeBlog,
  upBlog,
} = blog.actions;

export default blog.reducer;
