import React from "react"
import { useSelector } from "react-redux"
import { selectCurrentPlan, selectUser } from "../features/userSlice"
import { auth } from "../firebase"
import Nav from "../Nav"
import PlansScreen from "./PlansScreen"
import "./ProfileScreen.css"

function ProfileScreen() {
  const user = useSelector(selectUser)
  const plan = useSelector(selectCurrentPlan)

  console.log(plan)

  return (
    <div className="profileScreen">
      <Nav />
      <div className="profileScreen__body">
        <h1>Edit Profile</h1>

        <div className="profileScreen__info">
          <img
            src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png"
            alt=""
          />
          <div className="profileScreen__details">
            <h2>{user?.email}</h2>
            <div className="profileScreen__plans">
              <h3>Current plan: {plan?.role}</h3>

              <PlansScreen />
              <button
                onClick={() => auth.signOut()}
                className="profileScreen__signOut"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileScreen
