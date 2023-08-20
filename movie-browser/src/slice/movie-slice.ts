import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
interface CounterState {
  movies: Array<Object>,
  loading: boolean
}

// Define the initial state using that type
const initialState: CounterState = {
  movies: [],
  loading: true
}

export const counterSlice = createSlice({
  name: 'moviesState',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    intialMovieList: (state, action: PayloadAction<Array<Object>>) => {
      console.log("redux",action)
        state.movies = [...action.payload]
        state.loading = false
        console.log("after",state.movies)
    },
    updateMovieList: (state, action: PayloadAction<Array<Object>>) => {
      state.movies = [...state.movies, ...action.payload]
      state.loading = false
    },
  },
})

export const { intialMovieList, updateMovieList } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const movieList = (state: RootState) => state.movieList

export default counterSlice.reducer