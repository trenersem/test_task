import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialStateType = {
token: string
};

const initialState: InitialStateType = {
 token: ''
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
  },
});

export const {
 setToken
} = authSlice.actions;


export default authSlice.reducer;