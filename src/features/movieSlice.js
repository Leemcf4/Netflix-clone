import { createSlice } from "@reduxjs/toolkit"

export const movieSlice = createSlice({
  name: "movie",
  initialState: {
    movieDetails: null,
    watchlist: [],
  },
  reducers: {
    movieDetails: (state, action) => {
      state.movieDetails = action.payload
    },
    addMovie: (state, action) => {
      return {
        ...state,
        watchlist: [...state.watchlist, action.payload],
      }
    },
    removeMovie: (state, action) => {
      return {
        ...state,
        watchlist: state.watchlist.filter(
          (i) => i.movie.id !== action.payload.movie.id
        ),
      }
    },
  },
})

export const { movieDetails, addMovie, removeMovie } = movieSlice.actions

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const getMovieWatchlist = (state) => state.movie.watchlist
export const getMovieDetails = (state) => state.movie.movieDetails

export default movieSlice.reducer
