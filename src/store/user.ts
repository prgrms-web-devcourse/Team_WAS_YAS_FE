import { UserType } from '@/Models';
// TODO: PayloadAction이 임포트 되지 않아서 임시로 pkg로 임포트
/* eslint-disable */
import pkg from '@reduxjs/toolkit';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
/* eslint-disable */
import { userApi } from '@/apis';
export interface UserStateType {
  loading: boolean;
  data: UserType | null;
  error: boolean;
}

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const response = await userApi.getUser();
  return response.data.data;
});

export const user = createSlice({
  name: 'user',
  initialState: { loading: false, data: null, error: false } as UserStateType,
  reducers: {},
  extraReducers: {
    [fetchUser.pending.type]: (state: UserStateType) => {
      state.loading = true;
      state.data = null;
      state.error = false;
    },
    [fetchUser.fulfilled.type]: (
      state: UserStateType,
      action: pkg.PayloadAction<UserType>,
    ) => {
      state.loading = false;
      state.data = action.payload;
      state.error = false;
    },
    [fetchUser.rejected.type]: (
      state: UserStateType,
      action: pkg.PayloadAction<UserType>,
    ) => {
      state.loading = false;
      state.data = null;
      state.error = true;
    },
  },
});
