// import React from 'react'

import Add from '../../assets/add_icon.png'
import Blog from '../../assets/blog_icon.png'
import Subscription from '../../assets/email_icon.png'
import { NavLink } from "react-router-dom";
import './Sidebar.css'


const Sidebar = () => {
  return (
    <div className="sidebar">
    <div className="sidebar-options">
      <NavLink to="/" className="sidebar-option">
        <img src={Add} alt="" />
        <p>Add Blogs</p>
      </NavLink>
      <NavLink to="/list" className="sidebar-option">
        <img src={Blog} alt="" />
        <p>Blog List</p>
      </NavLink>
      <NavLink to="/subscription" className="sidebar-option">
        <img src={Subscription} alt="" />
        <p>Subscriptions</p>
      </NavLink>
    </div>
  </div>
  )
}

export default Sidebar
