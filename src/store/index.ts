import { configureStore } from '@reduxjs/toolkit'
import articleReducer from './articleSlice'
import editorReducer from './editorSlice'

export const store = configureStore({
  reducer: {
    article: articleReducer,
    editor: editorReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch