// import React from 'react'
import { data1, data3, data5 } from "./Footer.js";
import "./Footer.css";
import New from "./New.jsx";
import Review from '../Review/Review.jsx'
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>
      <div className="complete_footer">

        <div className="footer">

          <div>
            <h2 className="section_heading">NEWS</h2>
            <div className="footer_lists">
              {data1.map((item, index) => {
                return (
                  <div key={index}>
                    <Link to={`/news${item.link}`}>
                        <h1>{item.name}</h1>
                      </Link>
                  </div>
                );
              })}
            </div>
          </div>

         

          {/* <div>
            <h2 className="section_heading">CATEGORIES</h2>
            <div className="footer_lists">
              {data2.map((item, index) => {
                return (
                  <div key={index}>
                    <h1>{item.name}</h1>
                  </div>
                );
              })}
            </div>
          </div> */}

          <div>
            <h2 className="section_heading">TOOLS</h2>
            <div className="footer_lists">
              {data3.map((item, index) => {
                return (
                  <div key={index}>
                   <Link
                        to={item.link ? item.link : "https://dune.com/home"}
                      >
                        {" "}
                        <h1>{item.name}</h1>
                      </Link>
                  </div>
                );
              })}
            </div>
          </div>

          

        

          <div>
            <h2 className="section_heading">ABOUT US</h2>
            <div className="footer_lists">
              {data5.map((item, index) => {
                return (
                  <div key={index}>
                      <Link to={item.link}>
                        {" "}
                        <h1>{item.name}</h1>
                      </Link>
                  </div>
                );
              })}
            </div>
          </div>

        

        
        </div>
         
         <Review />
        

      </div>

      <New />
    </>
  );
};

export default Footer;
