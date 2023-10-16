import React, { useEffect } from "react"
import Layout from "./Layout"
import FormAddUser from "../components/FormAddUser"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

const AddUser = () => {
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
      <FormAddUser />
    </Layout>
  )
}

export default AddUser
