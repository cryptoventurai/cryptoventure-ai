// import React from 'react'

import Navbar from "./components/Navbar/Navbar"
import Sidebar from "./components/Sidebar/Sidebar"
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Subscription from './pages/Subscription/Subscription'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Routes , Route} from 'react-router-dom'

const App = () => {
    
  const url = 'https://crypto-venture-backend.onrender.com';

  return (
    <div>
       <ToastContainer />
      <Navbar />
      <hr />
      <div className="flex">
        <Sidebar />
        <Routes>

          <Route path="/"   element = {<Add url={url}/>}   />
          <Route path="/list"   element = {<List url={url}/>}   />
          <Route path="/order"   element = {<Subscription url={url}/>}   />

        </Routes>
      </div>
    </div>
  )
}

export default App