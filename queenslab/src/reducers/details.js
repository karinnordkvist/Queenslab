import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  numbers: '',
  name: '',
  date: ['', ''],
  cvv: '',
  cvvDisplay: false,
};

export const details = createSlice({
  name: 'details',
  initialState: initialState,
  reducers: {
    setNumbers: (state, action) => {
      state.numbers = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setMonth: (state, action) => {
      state.date[0] = action.payload;
    },
    setYear: (state, action) => {
      state.date[1] = action.payload;
    },
    setCvv: (state, action) => {
      state.cvv = action.payload;
    },
    setCvvStatus: (state, action) => {
      state.cvvDisplay = action.payload;
    },
  },
});
