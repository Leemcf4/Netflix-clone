import axios from "./axios"
import React, { useEffect, useState } from "react"
import "./Banner.css"
import requests from "./requests"
import { useDispatch, useSelector } from "react-redux"
import { addMovie, getMovieWatchlist, removeMovie } from "./features/movieSlice"

function Banner() {
  const [movie, setMovie] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(requests.fetchNetflixOriginals)
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      )
      return request
    }

    fetchData()
  }, [])

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

  console.log(movie)

  const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string
  }

  const watchlist = useSelector(getMovieWatchlist)

  let isInWatch = watchlist?.find((o) => o.movie.id === movie.id)

  return (
    <header
      className="banner "
      style={{
        backgroundSize: "cover",
        backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie?.backdrop_path}')`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__content">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          {!isInWatch ? (
            <button
              onClick={() =>
                addToWatchlist({
                  movie,
                })
              }
              className="banner__button"
            >
              + My List
            </button>
          ) : (
            <button
              onClick={() =>
                removeFromWatchlist({
                  movie,
                })
              }
              className="banner__button"
            >
              ✓ In My List
            </button>
          )}
        </div>
        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  )
}

export default Banner
