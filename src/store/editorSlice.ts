import { createSlice } from '@reduxjs/toolkit'

const editorSlice = createSlice({
  name: 'editor',
  initialState: {
    assistantVisible: false
  },
  reducers: {
    assistantVisibleToggled(state, action) {
      state.assistantVisible = action.payload
    }
  }
})

export const { assistantVisibleToggled } = editorSlice.actions

export default editorSlice.reducer
