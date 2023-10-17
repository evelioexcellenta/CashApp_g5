import React from "react"
import { useSelector } from "react-redux"

const Welcome = () => {
  const { user } = useSelector((state) => state.auth)
  // console.log(user)
  return (
    <div>
      <h1 className="title">Dashboard</h1>
      <h2 className="subtitle">
        Welcome Back <strong>{user && user.fullname}</strong>{" "}
      </h2>
    </div>
  )
}

export default Welcome
