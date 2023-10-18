import React, { useEffect } from "react"
import Layout from "./Layout"
import FormResetPassword from "../components/FormResetPassword"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

const ResetPassword = () => {
  const navigate = useNavigate()
  const { isError, user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isError) {
      navigate("/")
    }
    // if (user && user.Role !== "admin") {
    //   navigate("/dashboard")
    // }
  }, [isError, navigate, user])
  return (
    <Layout>
      <FormResetPassword />
    </Layout>
  )
}

export default ResetPassword
