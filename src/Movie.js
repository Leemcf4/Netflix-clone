import React from "react"
import "./Movie.css"
import PlayArrowIcon from "@material-ui/icons/PlayArrow"
import AddIcon from "@material-ui/icons/Add"
import { useDispatch, useSelector } from "react-redux"
import { addMovie, getMovieWatchlist, removeMovie } from "./features/movieSlice"
import RemoveIcon from "@material-ui/icons/Remove"
import PauseIcon from "@material-ui/icons/Pause"
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined"
import { useHistory } from "react-router-dom"

function Movie({ isLarge, movie, base_url, handleClick, trailerUrl }) {
  const dispatch = useDispatch()
  const history = useHistory()

  const addToWatchlist = (movie) => {
    dispatch(addMovie(movie))
  }

  const removeFromWatchlist = (movie) => {
    dispatch(removeMovie(movie))
    // if (router.pathname === "/watchlist") {
    //   router.push("/watchlist")
    // }
  }

  console.log(movie)

  const watchlist = useSelector(getMovieWatchlist)

  let isInWatch = watchlist?.find((o) => o.movie.id === movie.id)

  return (
    <div className={`row__poster ${isLarge && "row__poster__large"}`}>
      <img
        className={`row__poster__image ${
          isLarge && "row__poster__large__image"
        }`}
        src={`${base_url}${isLarge ? movie.poster_path : movie.backdrop_path}`}
        alt={movie.name}
      />

      <div
        className={`row__poster__over ${isLarge && "row__poster__large__over"}`}
      >
        <div className="button__container">
          <button
            className={`movie__play ${isLarge && "movie__play__large"}`}
            onClick={() => handleClick(movie)}
          >
            {trailerUrl === "" || trailerUrl === movie.name ? (
              <PlayArrowIcon />
            ) : (
              <PauseIcon />
            )}
          </button>
          {!isInWatch ? (
            <button
              onClick={() =>
                addToWatchlist({
                  movie,
                })
              }
              className={`movie__add ${isLarge && "movie__add__large"}`}
            >
              <AddIcon />
            </button>
          ) : (
            <button
              onClick={() =>
                removeFromWatchlist({
                  movie,
                })
              }
              className={`movie__add ${isLarge && "movie__add__large"}`}
            >
              <RemoveIcon />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Movie
