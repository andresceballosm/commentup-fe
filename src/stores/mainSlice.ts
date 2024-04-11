import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserPayloadObject } from '../interfaces';

interface MainState {
  userName: string;
  userEmail: null | string;
  userAvatar: null | string;
  isFieldFocusRegistered: boolean;
}

const initialState: MainState = {
  /* User */
  userName: '',
  userEmail: null,
  userAvatar: null,

  /* Field focus with ctrl+k (to register only once) */
  isFieldFocusRegistered: false,
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserPayloadObject>) => {
      // eslint-disable-next-line no-param-reassign
      state.userName = action.payload.name;
      // eslint-disable-next-line no-param-reassign
      state.userEmail = action.payload.email;
      // eslint-disable-next-line no-param-reassign
      state.userAvatar = action.payload.avatar;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = mainSlice.actions;

export default mainSlice.reducer;
