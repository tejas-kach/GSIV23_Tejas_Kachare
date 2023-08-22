import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
interface CounterState {
  movieList: Array<Object>,
  listData : {
    page: number,
    total: number,
    search: string,
  },
  searchList: boolean,
  loading: boolean
}
interface ListPayload {
  movies: Array<object>,
  listData : {
    page: number,
    total: number,
    search: string,
  }
} 

// Define the initial state using that type
const initialState: CounterState = {
  movieList: [],
  listData: {
    page: 1,
    total: 100,
    search: "",
  },
  searchList: false,
  loading: true
}

export const counterSlice = createSlice({
  name: 'moviesState',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    intialMovieList: (state, action: PayloadAction<ListPayload>) => {
      console.log("redux1",action)
        state.movieList = [...action.payload.movies]
        state.listData = {...action.payload.listData}
        state.loading = false
        console.log("after",state.movieList)
    },
    updateMovieList: (state, action: PayloadAction<ListPayload>) => {
      console.log("redux2",action)
      state.movieList = [...state.movieList, ...action.payload.movies]
      state.listData = {...state.listData , ...action.payload.listData}
      state.loading = false
    },
    setSearchList: (state, action: PayloadAction<boolean>) => {
      console.log("redux3",action)
      state.searchList = action.payload
    }
  },
})

export const { intialMovieList, updateMovieList, setSearchList } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const movieList = (state: RootState) => state.movieList

export default counterSlice.reducer