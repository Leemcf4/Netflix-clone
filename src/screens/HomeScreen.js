import React from "react"
import { useSelector } from "react-redux"
import Banner from "../Banner"
import { getMovieWatchlist } from "../features/movieSlice"
import "./HomeScreen.css"
import Nav from "../Nav"
import requests from "../requests"
import Row from "../Row"

function HomeScreen() {
  const watchlist = useSelector(getMovieWatchlist)

  return (
    <div className="home-screen">
      <Nav />
      <Banner />
      {watchlist.length > 0 && (
        <Row
          title="My List"
          myList={true}
          listData={watchlist}
          isLarge={true}
        />
      )}
      {watchlist.length <= 0 && (
        <p className="message">
          Hover and add items to your list, try a search (I will add single
          movie pages) or play a trailer(well one that works lol)
        </p>
      )}

      <Row
        title="NETFLIX ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
        isLarge={true}
      />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
    </div>
  )
}

export default HomeScreen
