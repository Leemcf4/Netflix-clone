import axios from "axios"
import React, { useEffect, useState } from "react"
import Nav from "../Nav"
import "./MovieScreen.css"
import AddIcon from "@material-ui/icons/Add"
import RemoveIcon from "@material-ui/icons/Remove"
import { useDispatch, useSelector } from "react-redux"
import {
  addMovie,
  getMovieWatchlist,
  removeMovie,
} from "../features/movieSlice"

function MovieScreen(props) {
  const movieId = props.match.params.id
  const [movie, setMovie] = useState("")

  const dispatch = useDispatch()

  const addToWatchlist = (movie) => {
    dispatch(addMovie(movie))
  }

  const removeFromWatchlist = (movie) => {
    dispatch(removeMovie(movie))
    // if (router.pathname === "/watchlist") {
    //   router.push("/watchlist")
    // }
  }

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=1e23ba90b1f2e5e9e44f5674ee73fb30&language=en-US`
      )
      setMovie(request.data)

      return request
    }
    fetchData()
  }, [movieId])

  const base_url = "https://image.tmdb.org/t/p/original/"

  const genres = movie.genres
  // const releaseYear = movie.release_date.substring(0, 4)

  const watchlist = useSelector(getMovieWatchlist)

  let isInWatch = watchlist?.find((o) => o.movie.id === movie.id)

  console.log(movie)

  return (
    <div className="movieScreen">
      <Nav />
      <div className="movieScreen__container">
        <div className="movie__image__container">
          <img
            className="movie__image"
            src={`${base_url}${movie?.poster_path}`}
            alt=""
          />
        </div>
        <div className="movie__body">
          <div className="movie__title">
            {" "}
            {movie?.title}
            <div className="movie__date">
              ({movie.release_date?.substring(0, 4)})
            </div>
          </div>

          <div className="movie__genres">
            {genres?.map((genre) => (
              <p key={genre.id}>{genre.name}</p>
            ))}
          </div>
          <div className="movie__overview">{movie.overview}</div>
          <div className="movie__data">
            <div
              className={`movie__rating ${
                movie.vote_average > 4.9 && "movie__rating--medium"
              } ${movie.vote_average > 6.9 && "movie__rating--high"}`}
            >
              {movie.vote_average}
            </div>
            <div className="movie__list">
              {!isInWatch ? (
                <AddIcon
                  onClick={() =>
                    addToWatchlist({
                      movie,
                    })
                  }
                  className="movie__addIcon"
                />
              ) : (
                <RemoveIcon
                  onClick={() =>
                    removeFromWatchlist({
                      movie,
                    })
                  }
                  className="movie__addIcon"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieScreen
