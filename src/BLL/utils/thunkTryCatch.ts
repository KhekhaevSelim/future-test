import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { AppDispatch, RootStateType } from "../store";

export const thunkTryCatch = async (thunkAPI : BaseThunkAPI<RootStateType, unknown, AppDispatch,any>, logic : Function) => {
  const { rejectWithValue } = thunkAPI
  try {
    return await logic()
  } catch (e) {
    return rejectWithValue(e);
  }
}
