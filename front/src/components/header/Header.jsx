// import React from 'react'
import Logo from "../../assets/Logo_2.png";
// import Data from "./Rates";
import "./Header.css";
import Language from "./Language";
import { useState } from "react";
import { data1, data3, data5 } from "../footer/Footer";
import Cross from "../../assets/cross.png";
import Cancel from "../../assets/cancel.png";
// import Dropdowns from "./Dropdowns";
import { Link } from "react-router-dom";
import RatesSlider from "./RatesSlider";

const Header = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [search, setSearch] = useState(false);

  const onSearch = () => {
    setSearch(!search);
  };

  const closeSearch = () => {
    setSearch(false);
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
  return (
    <>
      <div className="header">
        <Link to="/">
          <img src={Logo} alt="Logo" className="w-[250px]" />
        </Link>

        <RatesSlider />

        <div className="select_wrapper">
          <Language />
          <h2 className="advertise">Advertise</h2>
        </div>
      </div>

      {/* <Dropdowns /> */}

      <nav className="mobile_nav">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-fg-primaryDefault md:text-fg-default md:group-hover:text-common-white"
          onClick={toggleSidebar}
        >
          <path
            d="M21 18.5a.5.5 0 01-.5.5h-17a.5.5 0 01-.5-.5v-1a.5.5 0 01.5-.5h17a.5.5 0 01.5.5v1zm0-6a.5.5 0 01-.5.5h-17a.5.5 0 01-.5-.5v-1a.5.5 0 01.5-.5h17a.5.5 0 01.5.5v1zm0-6a.5.5 0 01-.5.5h-17a.5.5 0 01-.5-.5v-1a.5.5 0 01.5-.5h17a.5.5 0 01.5.5v1z"
            fill="#FABC2C"
          ></path>
        </svg>

        <Link to="/">
          <img src={Logo} alt="" className="mobile_logo" />
        </Link>

        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          data-testid="header-button-magnifier"
          className="text-fg-primaryDefault md:text-fg-default md:group-hover:text-common-white"
          onClick={onSearch}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16 10.5a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0zm-.642 6.273a.525.525 0 00-.664-.054 7.5 7.5 0 112.025-2.025.525.525 0 00.054.665l4.288 4.287a.5.5 0 010 .708l-.707.707a.5.5 0 01-.708 0l-4.288-4.288z"
            fill="#FABC2C"
          ></path>
        </svg>
      </nav>
      <div className="mg:hidden">
        <RatesSlider />
      </div>

      {sidebarVisible && (
        <div className={`sidebar_content ${sidebarVisible ? "show" : ""}`}>
          <img
            src={Cross}
            alt=""
            onClick={toggleSidebar}
            className=" ml-[auto] my-[2rem] py-[0rem] px-[1rem]"
          />

          <div className="sidebar_content_lists">
            <div>
              <h2 className="section_heading text-yellow-600">NEWS</h2>
              <div className="sidebar_lists">
                {data1.map((item, index) => {
                  return (
                    <div
                      className="hover:underline hover:decoration-solid mb-[5px]"
                      key={index}
                    >
                      <Link to={`/news${item.link}`}>
                        <h1 className="sidebar_h1s mb-[5px]">{item.name}</h1>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* <div>
              <h2 className="section_heading text-yellow-600">CATEGORIES</h2>
              <div className="sidebar_lists">
                {data2.map((item, index) => {
                  return (
                    <div
                      className="hover:underline hover:decoration-solid mb-[5px]"
                      key={index}
                    >
                      <h1 className="sidebar_h1s mb-[5px]">{item.name}</h1>
                    </div>
                  );
                })}
              </div>
            </div> */}

            <div>
              <h2 className="section_heading text-yellow-600">TOOLS</h2>
              <div className="sidebar_lists">
                {data3.map((item, index) => {
                  return (
                    <div
                      className="hover:underline hover:decoration-solid mb-[5px]"
                      key={index}
                    >
                      <Link
                        to={item.link ? item.link : "https://dune.com/home"}
                      >
                        {" "}
                        <h1 className="sidebar_h1s mb-[5px]">{item.name}</h1>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <h2 className="section_heading text-yellow-600">ABOUT US</h2>
              <div className="sidebar_lists">
                {data5.map((item, index) => {
                  return (
                    <div
                      className="hover:underline hover:decoration-solid mb-[5px]"
                      key={index}
                    >
                      <Link to={item.link}>
                        {" "}
                        <h1 className="sidebar_h1s mb-[5px]">{item.name}</h1>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {search && (
        <div className="flex px-[1rem] py-[0rem] border border-solid border-slate-600 h-[40px] items-center">
          🔍
          <input
            type="text"
            placeholder="Search"
            className="w-[100%] outline-none"
          />
          <img src={Cancel} alt="" onClick={closeSearch} />
        </div>
      )}
    </>
  );
};

export default Header;
