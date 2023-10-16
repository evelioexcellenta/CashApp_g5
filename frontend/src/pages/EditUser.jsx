import React, { useEffect } from "react"
import Layout from "./Layout"
import FormEditUser from "../components/FormEditUser"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

const EditUser = () => {
  const navigate = useNavigate()
  const { isError, user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isError) {
      navigate("/")
    }
    if (user && user.Role !== "admin") {
      navigate("/dashboard")
    }
  }, [isError, navigate, user])
  return (
    <Layout>
      <FormEditUser />
    </Layout>
  )
}

export default EditUser
