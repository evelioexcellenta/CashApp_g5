import React from "react"

const NotificationPage = () => {
  return (
    <div className="columns is-centered is-vcentered is-fullheight ">
      <div className="column ">
        <div
          className="notification is-success is-flex is-align-items-center is-justify-content-center is-fullheight is-size-4"
          style={{
            border: "1px solid #ccc",
            padding: "1em",
            borderRadius: "10px",
          }}
        >
          Email for password reset has been sent!
        </div>
      </div>
    </div>
  )
}

export default NotificationPage
