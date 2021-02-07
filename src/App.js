import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import "./App.css"
import {
  login,
  logout,
  selectCurrentPlan,
  selectUser,
} from "./features/userSlice"
import { auth } from "./firebase"
import HomeScreen from "./screens/HomeScreen"
import LoginScreen from "./screens/LoginScreen"
import MovieScreen from "./screens/MovieScreen"
import ProfileScreen from "./screens/ProfileScreen"
import SignUpScreen from "./screens/SignUpScreen"
import WatchlistScreen from "./screens/WatchlistScreen"

function App() {
  const user = useSelector(selectUser)
  const plan = useSelector(selectCurrentPlan)

  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(login({ uid: userAuth.uid, email: userAuth.email }))
      } else {
        dispatch(logout())
      }
    })
    return unsubscribe
  }, [dispatch])

  return (
    <div className="App">
      <Router>
        {!user ? (
          <LoginScreen />
        ) : (
          <Switch>
            <Route path="/movie/:id" component={MovieScreen}></Route>
            <Route path="/watchlist" exact>
              <WatchlistScreen />
            </Route>
            <Route path="/profile" exact>
              <ProfileScreen />
            </Route>
            <Route path="/signin" exact>
              <SignUpScreen />
            </Route>
            <Route path="/" exact>
              <HomeScreen />
            </Route>
          </Switch>
        )}
      </Router>
    </div>
  )
}

export default App
