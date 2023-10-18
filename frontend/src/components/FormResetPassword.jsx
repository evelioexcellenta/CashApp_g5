// ResetPasswordForm.js
import React, { useState } from "react"
import axios from "axios"

const ResetPasswordForm = () => {
  const [email, setEmail] = useState("")
  const [msg, setMsg] = useState("")

  const handleResetPassword = async (e) => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:3300/reset", { email })
      setMsg("Reset link has been sent to your email.")
    } catch (error) {
      console.error(error)
      setMsg("Failed to send reset link. Please try again.")
    }
  }

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleResetPassword}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {msg && <div>{msg}</div>}
    </div>
  )
}

export default ResetPasswordForm
