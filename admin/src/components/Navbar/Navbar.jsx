// import React from 'react'
import Logo from '../../assets/Logo_2.png'

const Navbar = () => {
  return (
    <div className = "bg-zinc-900 flex flex-row justify-between items-center p-[10px] py-[20px] sm:px-[20px] font-sans">

        <img src={Logo} alt="" className="w-[150px] sm:w-[200px]" />

        <h2 className="font-bold text-[1rem] sm:text-[2rem] text-white">Admin Panel</h2>
      
    </div>
  )
}

export default Navbar
