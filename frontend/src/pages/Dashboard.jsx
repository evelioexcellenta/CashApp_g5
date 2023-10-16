import React, { useEffect } from "react"
import Layout from "./Layout"
import Welcome from "../components/Welcome"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const Dashboard = () => {
  const navigate = useNavigate()
  const { isError } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isError) {
      navigate("/")
    }
  }, [isError, navigate])

  return (
    <Layout>
      <Welcome />
    </Layout>
  )
}

export default Dashboard
