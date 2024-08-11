import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginCreds, SignUpCreds, UserType } from "./Types";
import { backendUrl, getAuthToken, setAuthToken } from "./authUtil";
import axios from "axios";

const authUrl = backendUrl + "/api/auth";

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
  userId: string | null;
  user: UserType | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  userId: null,
  error: null,
  isLoading: false,
  user: null,
  successMessage:null
};

// TypeScript type for the thunk API
interface ThunkAPI {
  dispatch: any; // Change `any` to your app's dispatch type if available
  rejectWithValue: (value: any) => any;
}

export const signup = createAsyncThunk(
  "auth/signup",
  async (data: SignUpCreds, { dispatch, rejectWithValue }: ThunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(`${authUrl}/register`, data, config);
      if (response.data.success === false) {
        console.log(response.data.message);
        return rejectWithValue(response.data.message);
      }

      // Dispatch validateUser after successful login
      // dispatch(validateUser());

      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "An error occurred"
      );
    }
  }
);
export const login = createAsyncThunk(
  "auth/login",
  async (data: LoginCreds, { dispatch, rejectWithValue }: ThunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(`${authUrl}/login`, data, config);
      if (response.data.success === false) {
        console.log(response.data.message);
        return rejectWithValue(response.data.message);
      }
      const { token, userId } = response.data;
      setAuthToken(token);
      localStorage.setItem("userId", userId);

      // Dispatch validateUser after successful login
      dispatch(validateUser());

      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "An error occurred"
      );
    }
  }
);

export const validateUser = createAsyncThunk(
  "auth/validate",
  async (_, { rejectWithValue }) => {
    try {
      const authToken = getAuthToken();
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
      const response = await axios.get(`${authUrl}/validate`, config);
      if (response.data.success === true) {
        return response.data;
      } else {
        throw new Error("User not validated");
      }
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "An error occurred"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.successMessage = null;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userId = null;
      state.user = null;
      localStorage.removeItem("userId");
      setAuthToken(""); // Clear token
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.userId = action.payload.userId;
        state.user = action.payload.user;
        state.isLoading = false;
        state.successMessage = 'Login Successfull'
      })
      .addCase(login.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "An error occurred";
      });
    builder
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.successMessage ="Signup Successful, Login !"
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "An error occurred";
      });
    builder
      .addCase(validateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(validateUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.userId = action.payload.userId;
        state.user = action.payload.user;
        state.isLoading = false;
      })
      .addCase(validateUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.isLoading = false;
      });
  },
});

export const { clearError, logout } = authSlice.actions;
export default authSlice.reducer;
