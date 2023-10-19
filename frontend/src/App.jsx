
import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar, { SidebarItem } from './components/myNavbar';//
// import "bootstrap/dist/css/bootstrap.css"

import Home from './pages/Home';
import Login from './pages/Auth/Login'
import Admin from './pages/Admin'
import Cart from './pages/Cart'
import History from './pages/History'
import ProductDetail from './pages/ProductDetail'
import Search from './pages/Search'
import FullAdmin from './pages/FullAdmin';

import { LifeBuoy, Receipt, Boxes, Package, UserCircle, BarChart3, LayoutDashboard, Settings } from 'lucide-react';

function App() {
  return (
    <div className='App' style={{ display: 'flex' }}>

      <BrowserRouter>
        <Sidebar>
          <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" to="/search" />
          {/* <SidebarItem icon={<BarChart3 size={20} />} text="Statistics" />
          <SidebarItem icon={<UserCircle size={20} />} text="Users" /> */}
          {/* <SidebarItem icon={<Boxes size={20} />} text="Inventory"  to="/home"/> */}
          {/* <SidebarItem icon={<Package size={20} />} text="Orders"  to={"/history"}/> */}
          <SidebarItem icon={<Receipt size={20} />} text="Admin" to='/fulladmin'/>
          <hr className='my-3' />
          <SidebarItem icon={<Settings size={20} />} text="Settings" />
          <SidebarItem icon={<LifeBuoy size={20} />} text="Account" />
        </Sidebar>

        <div style={{ marginLeft: '250px' }}>
          <Routes>
            <Route Component={Home} path='/home' />
            <Route element={<Search/>} path='/search' />
            <Route path='/fulladmin' element={<FullAdmin />} />
            <Route Component={Login} path='/login' />
            <Route Component={ProductDetail} path='/product-detail/:productId' />
            <Route Component={Cart} path='/cart' />
            <Route Component={History} path='/history' />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
