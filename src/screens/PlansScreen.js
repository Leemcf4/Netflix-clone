import { loadStripe } from "@stripe/stripe-js"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { currentPlan, selectUser } from "../features/userSlice"
import db from "../firebase"
import "./PlansScreen.css"

function PlansScreen() {
  const [products, setProducts] = useState([])
  const user = useSelector(selectUser)
  const [subscription, setSubscription] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    db.collection("customers")
      .doc(user?.uid)
      .collection("subscriptions")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (subscription) => {
          setSubscription({
            role: subscription.data().role,
            current_period_end: subscription.data().current_period_end.seconds,
            current_period_start: subscription.data().current_period_start
              .seconds,
          })
        })
      })
    // dispatch(currentPlan(subscription))
  }, [user.uid])

  useEffect(() => {
    db.collection("products")
      .where("active", "==", true)
      .get()
      .then((querySnapshot) => {
        const products = {}
        querySnapshot.forEach(async (productDoc) => {
          products[productDoc.id] = productDoc.data()
          const priceSnap = await productDoc.ref.collection("prices").get()
          priceSnap.docs.forEach((price) => {
            products[productDoc.id].prices = {
              priceId: price.id,
              priceData: price.data(),
            }
          })
        })
        setProducts(products)
      })
  }, [])

  const loadCheckout = async (priceId) => {
    const docRef = await db
      .collection("customers")
      .doc(user.uid)
      .collection("checkout_sessions")
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      })
    docRef.onSnapshot(async (snap) => {
      const { error, sessionId } = snap.data()

      if (error) {
        alert(`An error occured: ${error.message}`)
      }

      if (sessionId) {
        const stripe = await loadStripe(
          "pk_test_51IHZ4tLyMapiJ1vtbC2J4jRz9LG2sEzBQEmTLxWSb1xhDDj5pR9druu1w0lH0rqIRxmekqBaKxGxlBY1R82GaKHN003u3x6yAQ"
        )

        stripe.redirectToCheckout({ sessionId })
      }
    })
  }

  console.log(products)
  console.log(subscription)
  return (
    <div className="plansScreen">
      <br />
      {subscription && (
        <p>
          Renews on:{" "}
          {new Date(
            subscription?.current_period_end * 1000
          ).toLocaleDateString()}{" "}
        </p>
      )}

      {Object.entries(products).map(([productId, productData]) => {
        const isCurrentPackage = productData.name
          ?.toLowerCase()
          .includes(subscription?.role)

        return (
          <div
            key={productId}
            className={`${
              isCurrentPackage && "plansScreen__plan--disabled"
            } plansScreen__plan`}
          >
            <div className="plansScreen__info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button
              onClick={() =>
                !isCurrentPackage && loadCheckout(productData?.prices.priceId)
              }
            >
              {isCurrentPackage ? "Current Package" : "Subscribe"}
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default PlansScreen
