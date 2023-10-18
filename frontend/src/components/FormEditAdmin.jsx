import React, { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
// import Foto from "./../assets/3x4(putih).jpg"

const FormEditUser = () => {
  const [fullname, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confPassword, setConfPassword] = useState("")
  const [role, setRole] = useState("")
  const [photo, setPhoto] = useState("")
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
          Photo: photo,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (photo) {
        const formData = new FormData()
        formData.append("profile", photo)
        await axios.post(`http://localhost:3300/users/${id}/upload`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      }
      if (role === "admin") {
        navigate("/users")
      } else {
        navigate("/dashboard")
      }
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

  const handleImageUpload = async (e) => {
    const formData = new FormData()
    formData.append("profile", e.target.files[0])

    try {
      const token = localStorage.getItem("token")
      await axios.post("http://localhost:3300/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      console.log("Profile image uploaded successfully!")
      setPhoto(response.data.filename)
      // Refresh halaman atau perbarui tampilan gambar profil
    } catch (error) {
      console.error("Error uploading profile image: ", error)
    }
  }
  return (
    <div>
      <h1 className="title">Users</h1>
      <h2 className="subtitle">Update User</h2>
      <div className="mb-4">
        <input
          type="file"
          accept=".jpg, .png, .gif"
          onChange={handleImageUpload}
        />
      </div>
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
              {role === "admin" ? (
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
              ) : (
                <div></div>
              )}
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
