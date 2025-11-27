import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentRole: 'lead', // 'lead' or 'member'
  currentUser: null, // member ID when in member view
};

const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    switchRole: (state, action) => {
      state.currentRole = action.payload;
    },
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { switchRole, setUser } = roleSlice.actions;
export default roleSlice.reducer;

