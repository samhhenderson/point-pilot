// import redux methods
import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit';

// import other
import { SettingState, Setting } from '../types';
import { executeSqlAsync } from '../db/db-service';

export const getSettings = createAsyncThunk(
  'setting/getSettings',
  (_, thunkApi) => {
    const query = `SELECT * FROM settings`;
    return executeSqlAsync(query, [])
      .then(response => response.rows._array)
      .catch(error => {
        console.log('GET SETTINGS ' + error);
        return thunkApi.rejectWithValue(error);
      });
  }
);

export const updateSetting = createAsyncThunk(
  'setting/updateSetting',
  (updatedSetting: Setting, thunkApi) => {
    thunkApi.dispatch(updateSettingState(updatedSetting));
    const query =
      `UPDATE settings
      SET value = ?
      WHERE name = ?;`;
    return executeSqlAsync(query, [
      updatedSetting.value,
      updatedSetting.name,
    ])
      .then(response => response.rows._array[0])
      .catch(error => {
        console.log('UPDATE SETTING ' + error);
        return thunkApi.rejectWithValue(error);
      });
  }
);

export const settingSlice = createSlice({
  name: 'setting',
  initialState: {
    byId: {'resetBid': {id: 1, name: 'resetBid', value: '1'},}
  } as SettingState,
  reducers: {
    updateSettingState: (state, action) => {
      state.byId[action.payload.name] = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getSettings.fulfilled, (state, action) => {
      if (action.payload) {
        state.byId = {};
        action.payload.forEach((setting: Setting) => {
          state.byId[setting.name] = setting;
        });
      }
    });
  }
})

export const { 
  updateSettingState,
} = settingSlice.actions;

export default settingSlice.reducer;