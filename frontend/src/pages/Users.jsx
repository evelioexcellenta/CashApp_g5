import React, { useEffect } from "react"
import Layout from "./Layout"
import UserList from "../components/UserList"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

const Users = () => {
  const navigate = useNavigate()
  const { isError, user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isError) {
      navigate("/")
    }
    if (user && user.role !== "admin") {
      navigate("/dashboard")
    }
  }, [isError, navigate, user])
  return (
    <Layout>
      <UserList />
    </Layout>
  )
}

export default Users
