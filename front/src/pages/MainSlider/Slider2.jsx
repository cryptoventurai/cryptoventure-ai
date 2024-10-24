import { useState, useEffect } from "react";
// import Bg1 from "../../assets/Bg1.jpeg";
import Bg2 from "../../assets/Bg6.jpeg";
import Bg3 from "../../assets/Bg7.jpeg";
import Bg4 from "../../assets/Bg8.jpeg";
import Bg5 from "../../assets/Bg9.jpeg";
import Bg6 from "../../assets/bg_new.jpg";
import Bg7 from "../../assets/bg_new2.jpg";
// import Bg8 from '../../assets/bg_new2.webp'
import axios from "axios";
import Dropdowns from "../../components/header/Dropdowns";
import NoImage from '../../assets/No_image.png'

const ImageSlider = () => {
  const slides = [Bg2, Bg6, Bg3, Bg4, Bg5, Bg7];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newsData, setNewsData] = useState([]);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? newsData.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === newsData.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  // Function to fetch news data from the API
  const fetchCryptoNews = async () => {
    try {
      const response = await axios.get(
        "https://crypto-venture-backend.onrender.com/api/news",
        { params: { q: "crypto currency" } }
      );
      const sortedNews = response.data.articles
        .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
        .slice(0); // Adjusted to 5 to match the number of slides
      setNewsData(sortedNews);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  // Autoplay functionality
  useEffect(() => {
    fetchCryptoNews();
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // 5000ms = 5 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [currentIndex]);

  return (
    <div className="relative w-full mx-auto">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {newsData.map((news, index) => (
            <div
              key={index}
              className="min-w-full h-[85vh] relative"
              style={{
                backgroundImage: `url(${slides[index % slides.length]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <Dropdowns />
              <div className="absolute pt-4 pb-[3rem] px-[4rem] rounded flex flex-row justify-between w-[100%] items-center gap-[2rem] h-[100%]">
                <div className="flex flex-col justify-center items-start gap-4 flex-1">
                  <h2 className="text-white text-[2.5rem] xl:text-[3.5rem] leading-[45px] xl:leading-[65px] font-semibold mb-4 ">
                    {news.title}
                  </h2>
                  <p className="text-white font-sans text-[20px]">
                    {news.description.slice(0 , 100)}
                  </p>
                  <a
                    href={news.url}
                    className="bg-blue-500 text-white p-2 hover:underline rounded-lg"
                    // target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read more
                  </a>
                </div>

                <img
                  src={news.urlToImage ? news.urlToImage : NoImage}
                  alt=""
                  className="w-full md:w-1/3 rounded-lg shadow-lg h-[350px] xl:h-[400px] border-4 border-white flex-2"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        className="absolute top-1/2 left-[1rem] transform -translate-y-1/2 bg-white text-black rounded-full p-2"
        onClick={prevSlide}
      >
        &#10094; {/* Left arrow */}
      </button>
      <button
        className="absolute top-1/2 right-[1rem] transform -translate-y-1/2 bg-white text-black  rounded-full p-2"
        onClick={nextSlide}
      >
        &#10095; {/* Right arrow */}
      </button>

      {/* Dots for slide indicators */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
        {newsData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-1 h-1 rounded-full ${
              index === currentIndex ? "bg-gray-800" : "bg-white"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
