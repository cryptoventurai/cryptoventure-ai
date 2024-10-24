// import React from 'react'
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer.jsx";
import ScrollToTop from "react-scroll-to-top";
// import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage.jsx";
import Form from "./pages/SubmissionForm/Form.jsx";
import FearAndGreed from "./pages/FearAndGreed/FearAndGreed.jsx";
import CompleteRambo from "./pages/RamboChart/CompleteRambo.jsx";
import Blog from './pages/Blogs/Blogs.jsx'
import Policy from "./pages/Policy/Policy.jsx";
import NewsPage from "./pages/News/NewsPage.jsx";
import Scroll from "./components/ScrollToTop/Scroll.jsx";
import Testing from "./Testing.jsx";
// import CryptoVC from "./pages/CryptoVc/CryptoVC.jsx";
import AllTokens from "./pages/AllTokens/AllTokens.jsx";
import Slider  from "./pages/MainSlider/Slider.jsx";
import Slider2  from "./pages/MainSlider/Slider2.jsx";

const App = () => {
  return (
    <>
      <ScrollToTop
        smooth={true}
        top="20"
        color="black"
        height="20"
        width="20"
        style={{
          borderRadius: "90px",
          backgroundColor: "#FABC2C",
          display: "flex",
          justifyContent: "center",
          fontWeight: "700",
          alignItems: "center",
        }}
      />

      <Header />

      {/* <> */}
        <Scroll />
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/fearandgreed" element={<FearAndGreed />} />
          <Route path="/rambochart" element={<CompleteRambo />} />
          <Route path="/form" element={<Form />} />
          <Route path="/policyandregulations" element={<Policy />} />
          <Route path="/news/:category" element={<NewsPage />} />
          <Route path="/test" element={<Testing />} />
          {/* <Route path="/cryptoVc" element={<CryptoVC />} /> */}
          <Route path="/alltokens" element={<AllTokens />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/slide" element={<Slider />} />
          <Route path="/slide2" element={<Slider2 />} />

        </Routes>
      {/* </> */}

      {/* <Review /> */}
      <Footer />
    </>
  );
};

export default App;