import React, { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

const UserList = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async () => {
    const token = localStorage.getItem("token")
    const response = await axios.get("http://localhost:3300/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setUsers(response.data)
  }

  const deleteUser = async (userID) => {
    const token = localStorage.getItem("token")
    await axios.delete(`http://localhost:3300/users/${userID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    getUsers()
  }

  return (
    <div>
      <h1 className="title">Users</h1>
      <h2 className="subtitle">List of User</h2>
      <Link
        to={"/users/add"}
        className="button is-primary mb-4"
        onClick={() => console.log("Link clicked")}
      >
        Add New
      </Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Fullname</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.UserID}>
              <td>{index + 1}</td>
              <td>{user.Fullname}</td>
              <td>{user.Email}</td>
              <td>{user.Role}</td>
              <td>
                <Link
                  to={`/users/edit/${user.UserID}`}
                  className="button is-small is-info mr-4"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteUser(user.UserID)}
                  className="button is-small is-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserList
