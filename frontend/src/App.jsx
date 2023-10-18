import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Login from "./components/Login"
import Users from "./pages/Users"
import AddUser from "./pages/AddUser"
import EditAdmin from "./pages/EditAdmin"
import ResetPassword from "./pages/ResetPassword"
import NotificationPage from "./pages/NotificationPages"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/users/add" element={<AddUser />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/users" element={<Users />}></Route>
          <Route path="/reset" element={<ResetPassword />}></Route>
          <Route path="/users/edit/:id" element={<EditAdmin />}></Route>
          <Route path="/notification" element={<NotificationPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
