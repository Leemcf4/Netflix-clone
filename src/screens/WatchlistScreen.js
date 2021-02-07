import React, { useState } from "react"
import { useSelector } from "react-redux"
import { getMovieWatchlist } from "../features/movieSlice"
import Movie from "../Movie"
import Nav from "../Nav"
import "./WatchlistScreen.css"
const movieTrailer = require("movie-trailer")

function WatchlistScreen() {
  const watchlist = useSelector(getMovieWatchlist)
  const [trailerUrl, setTrailerUrl] = useState("")
  console.log(watchlist)

  const base_url = "https://image.tmdb.org/t/p/original/"

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("")
    } else {
      movieTrailer(movie?.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search)
          setTrailerUrl(urlParams.get("v"))
        })
        .catch((e) => console.log(e))
    }
  }
  return (
    <div className="watchlistScreen">
      <Nav />

      <div className="watchlistScreen__container">
        <div className="watchlistScreen__title">
          {watchlist.length <= 0 ? (
            <h1>You have no items in your list</h1>
          ) : (
            <h1>Watchlist</h1>
          )}
        </div>

        <div className="watchlist__movie__container">
          {watchlist.map((movie) => (
            <div key={movie.movie.id} className="watchlist__movie">
              <Movie
                isLarge={true}
                movie={movie.movie}
                base_url={base_url}
                handleClick={handleClick}
                trailerUrl={trailerUrl}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WatchlistScreen
