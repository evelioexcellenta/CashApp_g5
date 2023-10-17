import React, { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"

const FormEditUser = () => {
  const [fullname, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confPassword, setConfPassword] = useState("")
  const [role, setRole] = useState("")
  const [msg, setMsg] = useState("")
  const navigate = useNavigate()
  const { id } = useParams()

  const updateUser = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem("token")
      await axios.patch(
        `http://localhost:3300/users/${id}`,
        {
          Fullname: fullname,
          Email: email,
          Password: password,
          ConfPassword: confPassword,
          Role: role,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      navigate("/users")
    } catch (error) {
      console.error(error)
      if (error.response) {
        setMsg(error.response.data.msg)
      }
    }
  }

  useEffect(() => {
    const getUserById = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await axios.get(`http://localhost:3300/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setFullName(response.data.Fullname)
        setEmail(response.data.Email)
        setRole(response.data.Role)
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg)
          console.error(error)
        }
      }
    }
    getUserById()
  }, [id])
  return (
    <div>
      <h1 className="title">Users</h1>
      <h2 className="subtitle">Update User</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updateUser}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Fullname</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    placeholder="Name"
                    value={fullname}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    type="password"
                    className="input"
                    placeholder="******"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Confirm Password</label>
                <div className="control">
                  <input
                    type="password"
                    className="input"
                    placeholder="******"
                    value={confPassword}
                    onChange={(e) => setConfPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Role</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormEditUser
