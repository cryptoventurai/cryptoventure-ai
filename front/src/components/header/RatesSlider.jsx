// import { useEffect, useState } from "react";
// import "./Header.css";
// import { useNavigate } from "react-router-dom";
// import DownArrow from "../../assets/new_icon (2).png";

// const RatesSlider = () => {
//   const navigate = useNavigate();

//   const [cryptoData, setCryptoData] = useState([]);

//   const url =
//     "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1";

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(url);
//         const data = await response.json();
//         setCryptoData(data.slice(0, 5));
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   return (
//     <>
//       <div className="slider_banner_for_rates_mobile_view">
//         <div className="coin_rates">
//           {cryptoData.map((item, index) => {
//             const isPositive = item.price_change_percentage_24h > 0;
//             return (
//               <div
//                 key={index}
//                 className={`coin-item ${index >= 4 ? "hidden-at-500" : ""}`}
//               >
//                 <p style={{ color: "#fabc2c" }}>{item.symbol.toUpperCase()}</p>
//                 {/* Format price with commas and add dollar sign */}
//                 <p className="text-white">
//                   ${item.current_price.toLocaleString()}
//                 </p>
//                 <p style={{ color: isPositive ? "green" : "red" }}>
//                   {item.price_change_percentage_24h.toFixed(2)}%
//                 </p>
//               </div>
//             );
//           })}
//           <button
//             onClick={() => navigate("/alltokens")}
//             className="text-white flex flex-row justify-center items-center"
//           >
//             <img src={DownArrow} alt="" className="w-[20px] h-[20px]" />
//           </button>
//         </div>
//       </div>

//     </>
//   );
// };

// export default RatesSlider;

import { useEffect, useState } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import DownArrow from "../../assets/new_icon (2).png";

const RatesSlider = () => {
  const navigate = useNavigate();

  const [cryptoData, setCryptoData] = useState([]);

  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1";
  const dogeUrl =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=dogecoin";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();

        // Remove USDT and keep other 4 tokens
        const filteredData = data
          .filter((item) => item.symbol !== "usdt")
          .slice(0, 4);

        // Fetch Dogecoin data and add it to the end
        const dogeResponse = await fetch(dogeUrl);
        const dogeData = await dogeResponse.json();

        setCryptoData([...filteredData, dogeData[0]]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="slider_banner_for_rates_mobile_view">
        <div className="coin_rates">
          {cryptoData.map((item, index) => {
            const isPositive = item.price_change_percentage_24h > 0;
            return (
              <div
                key={index}
                className={`coin-item ${index >= 4 ? "hidden-at-500" : ""}`}
              >
                <p style={{ color: "#fabc2c" }}>{item.symbol.toUpperCase()}</p>
                {/* Format price with commas and add dollar sign */}
                <p className="text-white">
                  ${item.current_price.toLocaleString()}
                </p>
                <p style={{ color: isPositive ? "green" : "red" }}>
                  {item.price_change_percentage_24h.toFixed(2)}%
                </p>
              </div>
            );
          })}
          <button
            onClick={() => navigate("/alltokens")}
            className="text-white flex flex-row justify-center items-center"
          >
            <img src={DownArrow} alt="" className="w-[20px] h-[20px]" />
          </button>
        </div>
      </div>

      <div className="slider_banner_for_rates_desktop_view">
        <div className="coin_rates">
          {cryptoData.map((item, index) => {
            const isPositive = item.price_change_percentage_24h > 0;
            return (
              <div key={index} className="coin-item">
                <p style={{ color: "#fabc2c" }}>{item.symbol.toUpperCase()}</p>
                {/* Format price with commas and add dollar sign */}
                <p className="text-white">
                  ${item.current_price.toLocaleString()}
                </p>
                <p style={{ color: isPositive ? "green" : "red" }}>
                  {item.price_change_percentage_24h.toFixed(2)}%
                </p>
              </div>
            );
          })}
          <button
            onClick={() => navigate("/alltokens")}
            className="text-white flex flex-row justify-center items-center"
          >
            View all{" "}
            <img src={DownArrow} alt="" className="w-[20px] h-[15px]" />
          </button>
        </div>
      </div>
    </>
  );
};

export default RatesSlider;
