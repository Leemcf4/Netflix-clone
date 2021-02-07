import axios from "axios"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { getMovieWatchlist, movieDetails } from "./features/movieSlice"
import "./Nav.css"

function Nav() {
  const [show, setShow] = useState(false)

  const [name, setName] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [timer, setTimer] = useState(null)
  const [onFocus, setOnFocus] = useState(false)
  const history = useHistory()

  const watchlist = useSelector(getMovieWatchlist)

  const dispatch = useDispatch()

  const searchSubs = async () => {
    clearTimeout(timer)
    setTimer(
      setTimeout(async () => {
        try {
          const { data } = await axios.get(
            `https://api.themoviedb.org/3/search/movie?api_key=1e23ba90b1f2e5e9e44f5674ee73fb30&language=en-US&query=${name}`
          )
          setSearchResults(data)
          console.log(data)
        } catch (err) {
          console.log(err)
        }
      }, 250)
    )
  }

  const goToMovie = (movie) => {
    dispatch(movieDetails(movie))
    setName("")
    history.push(`/movie/${movie.id}`)
  }

  useEffect(() => {
    if (name.trim() === "") {
      setSearchResults([])
      return
    }
    searchSubs()
  }, [name])

  const transitionNav = () => {
    if (window.scrollY > 100) {
      setShow(true)
    } else {
      setShow(false)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", transitionNav)
    return () => {
      window.removeEventListener("scroll", transitionNav)
    }
  }, [])

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <div className="nav__content">
        <img
          onClick={() => history.push("")}
          className="nav__logo"
          src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
          alt=""
        />

        <div className="nav__search">
          <input
            type="text"
            placeholder="search"
            className="nav__search__input "
            // style={{ backgroundColor: "#F5F5F5" }}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={() => setOnFocus(true)}
            // onBlur={() => setOnFocus(false)}
          />
          {onFocus &&
            !name == "" &&
            searchResults.results?.map((result) => (
              <div
                key={result.id}
                className="result__box "
                onClick={() => goToMovie(result)}
              >
                <img
                  className="object-contain "
                  src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`}
                  alt="movie"
                />
                <div className=" result__info">
                  <p className="font-medium">{result.name}</p>
                  <p className="text-gray-500">{result.title}</p>
                </div>
              </div>
            ))}
        </div>

        <p className="nav__list" onClick={() => history.push(`/watchlist`)}>
          My List <small>{watchlist?.length} </small>
        </p>
        <img
          onClick={() => history.push("/profile")}
          className="nav__avatar"
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
          alt=""
        />
      </div>
    </div>
  )
}

export default Nav
