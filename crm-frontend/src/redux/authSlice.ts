import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    formData: { name: string; email: string; phone: number; password: string },
    thunkAPI
  ) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        return thunkAPI.rejectWithValue(
          errorData.message || "Registration Failed"
        );
      }
      return await res.json();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || "Registration Failed"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData: { email: string; password: string }, thunkAPI) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        return thunkAPI.rejectWithValue(data.message || "Login Failed");
      }

      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Login Failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;
