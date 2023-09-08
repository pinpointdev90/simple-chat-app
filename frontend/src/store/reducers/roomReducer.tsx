import { createSlice } from '@reduxjs/toolkit';

const roomSlice = createSlice({
  name: 'rooms',
  initialState: {
    selectedRoom: {}
  },
  reducers: {
    setRoom: (state, action) => {
      state.selectedRoom = action.payload;
    }
  }
});

export const { setRoom } = roomSlice.actions;
export default roomSlice.reducer;
