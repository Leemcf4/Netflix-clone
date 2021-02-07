import axios from "./axios"
import React, { useEffect, useState } from "react"
import "./Row.css"
import ScrollContainer from "react-indiana-drag-scroll"
import Movie from "./Movie"
import YouTube from "react-youtube"
const movieTrailer = require("movie-trailer")

function Row({ title, fetchUrl, isLarge = false, myList = false, listData }) {
  const [movies, setMovies] = useState([])
  const [trailerUrl, setTrailerUrl] = useState("")

  const base_url = "https://image.tmdb.org/t/p/original/"

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(fetchUrl)
      setMovies(request.data.results)

      return request
    }
    fetchData()
  }, [fetchUrl])

  console.log(movies)

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  }

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
    <div className="row">
      <h2>{title}</h2>
      {!myList ? (
        <ScrollContainer vertical={false} className="row__posters">
          {/* <div className="row__posters"> */}
          {movies.map(
            (movie) =>
              ((isLarge && movie.poster_path) ||
                (!isLarge && movie.backdrop_path)) && (
                <Movie
                  key={movie.id}
                  isLarge={isLarge}
                  movie={movie}
                  base_url={base_url}
                  handleClick={handleClick}
                  trailerUrl={trailerUrl}
                />
              )
          )}
          {/* </div> */}
        </ScrollContainer>
      ) : (
        <ScrollContainer vertical={false} className="row__posters">
          {/* <div className="row__posters"> */}
          {listData.map(
            (data) =>
              ((isLarge && data.movie.poster_path) ||
                (!isLarge && data.movie.backdrop_path)) && (
                <Movie
                  key={data.movie.id}
                  isLarge={isLarge}
                  movie={data.movie}
                  base_url={base_url}
                  handleClick={handleClick}
                  trailerUrl={trailerUrl}
                />
              )
          )}
          {/* </div> */}
        </ScrollContainer>
      )}

      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  )
}

export default Row
