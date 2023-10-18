import React, { useEffect } from "react"
import Layout from "./Layout"
import FormEditAdmin from "../components/FormEditAdmin"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

const EditUser = () => {
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
      <FormEditAdmin />
    </Layout>
  )
}

export default EditUser
