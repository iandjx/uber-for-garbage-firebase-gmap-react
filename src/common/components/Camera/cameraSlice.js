import { createSlice } from '@reduxjs/toolkit'

const cameraSlice = createSlice({
  name: 'camera',
  initialState: {
    photoUrl: ''
  },
  reducers: {
    savePhoto (state, { payload }) {
      state.photoUrl = payload
    }
  }
})

export const { savePhoto } = cameraSlice.actions

export default cameraSlice.reducer
