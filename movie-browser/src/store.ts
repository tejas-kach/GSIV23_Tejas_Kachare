import { configureStore } from '@reduxjs/toolkit';
import  movieListReducer from './slice/movie-slice.ts';
// ...

export const store = configureStore({
  reducer:{
    moviesState: movieListReducer,
  } 
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;