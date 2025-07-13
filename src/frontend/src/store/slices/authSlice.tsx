import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface AuthState {
  user: null | any;
  loading: boolean;
  error: string | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isLoggedIn: false,
};

// 🔐 LOGIN
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials: { useremail: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/login",
        credentials
      );
      response.data.user.isLoggedIn = true;
      return response.data.user;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Login failed"
      );
    }
  }
);

// 🆕 SIGN UP
export const signUpUser = createAsyncThunk(
  "auth/signUp",
  async (
    data: { name: string; useremail: string; password: string },
    thunkAPI
  ) => {
    try {
      const response = await axios.post("http://localhost:3001/sign-in", data);
      return response.data.user;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Signup failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isLoggedIn = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // SIGNUP
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
