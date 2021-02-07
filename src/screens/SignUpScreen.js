import React, { useEffect, useRef, useState } from "react"
import { auth } from "../firebase"
import "./SignUpScreen.css"

function SignUpScreen() {
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const [isSignUp, setIsSignUp] = useState(false)

  const register = (e) => {
    e.preventDefault()
    auth
      .createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {
        console.log(authUser)
      })
      .catch((error) => {
        alert(error.message)
      })
  }

  const signIn = (e) => {
    e.preventDefault()
    auth
      .signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {
        console.log(authUser)
      })
      .catch((error) => {
        alert(error.message)
      })
  }

  return (
    <div className="SignUpScreen">
      <form>
        {!isSignUp ? (
          <>
            <h1>Sign In</h1>
            <input ref={emailRef} type="email" placeholder="Email" />
            <input ref={passwordRef} type="password" placeholder="Password" />
            <button type="submit" onClick={signIn}>
              Sign In
            </button>
            <h4>
              <span className="SignUpScreen__gray">New to Netflix? </span>
              <span
                className="SignUpScreen__link"
                onClick={() => setIsSignUp(true)}
              >
                Sign Up now
              </span>
            </h4>{" "}
          </>
        ) : (
          <>
            <h1>Sign Up</h1>
            <input ref={emailRef} type="email" placeholder="Email" />
            <input ref={passwordRef} type="password" placeholder="Password" />
            <button type="submit" onClick={register}>
              Sign Up
            </button>
            <h4>
              <span className="SignUpScreen__gray">Already a member? </span>
              <span
                className="SignUpScreen__link"
                onClick={() => setIsSignUp(false)}
              >
                Sign In
              </span>
            </h4>{" "}
          </>
        )}
      </form>
    </div>
  )
}

export default SignUpScreen
