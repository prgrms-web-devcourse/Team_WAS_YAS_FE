import { RoutineType } from '@/Models';
// eslint-disable-next-line
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { routineApi } from '@/apis';
export interface UserStateType {
  loading: boolean;
  data: RoutineType | null;
  error: boolean;
}

export const fetchRoutine = createAsyncThunk(
  'routine/fetchRoutine',
  async (routineId: number) => {
    const response = await routineApi.getRoutine(routineId);
    return response.data.data;
  },
);

export const routine = createSlice({
  name: 'user',
  initialState: { loading: false, data: null, error: false } as UserStateType,
  reducers: {},
  extraReducers: {
    [fetchRoutine.pending.type]: (state: UserStateType) => {
      state.loading = true;
      state.data = null;
      state.error = false;
    },
    [fetchRoutine.fulfilled.type]: (
      state: UserStateType,
      action: PayloadAction<RoutineType>,
    ) => {
      state.loading = false;
      state.data = action.payload;
      state.error = false;
    },
    [fetchRoutine.rejected.type]: (
      state: UserStateType,
      action: PayloadAction<RoutineType>,
    ) => {
      state.loading = false;
      state.data = null;
      state.error = true;
    },
  },
});
