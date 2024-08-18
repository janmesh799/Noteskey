import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { backendUrl, authTokenName, getAuthToken } from "../auth/authUtil";
import { TagType } from "./Types";
import axios from "axios";

const tagsUrl = backendUrl + "/api/tags";

const authToken = getAuthToken();
interface TagState {
  allTags: TagType[];
  loading: boolean;
  error: string | null;
}

const initialState: TagState = {
  allTags: [],
  loading: false,
  error: null,
};

// TypeScript type for the thunk API
interface ThunkAPI {
  dispatch: any; // Change `any` to your app's dispatch type if available
  rejectWithValue: (value: any) => any;
}

export const getAllTags = createAsyncThunk(
  "auth/getAllTags",
  async (_,{ rejectWithValue }: ThunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${authToken}`,
        },
      };
      const response = await axios.get(`${tagsUrl}/`, config);
      if (response.data.success === false) {
        console.log(response.data.message);
        return rejectWithValue(response.data.message);
      }

      return response.data.tags;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "An error occurred"
      );
    }
  }
);

const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllTags.pending, (state) => {
      state.allTags = [];
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllTags.fulfilled, (state, action) => {
      state.allTags = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getAllTags.rejected, (state, action) => {
      state.allTags = [];
      state.loading = false;
      state.error =
        typeof action.payload === "string"
          ? action.payload
          : "An error occurred";
    });
  },
});

export const {} = tagSlice.actions;
export default tagSlice.reducer;
