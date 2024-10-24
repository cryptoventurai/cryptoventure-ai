import { useEffect, useState, useRef } from "react";
import axios from "axios";
import moment from "moment";
// import {
//   EyeIcon,
//   HeartIcon,
//   ChatBubbleOvalLeftEllipsisIcon,
// } from "@heroicons/react/24/outline"; // Heroicons for logos
import { FaEye, FaThumbsUp, FaComment, FaShare } from "react-icons/fa";
import Heart from "./assets/Heart.png";
import Close from "./assets/close.png";

const Testing = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const videoPlayerRef = useRef(null);
  //   const [currentKeyIndex, setCurrentKeyIndex] = useState(0);

  let currentDate = new Date();

  // Subtract 2 days
  currentDate.setDate(currentDate.getDate() - 2);

  // Format the date to YYYY-MM-DDTHH:MM:SSZ
  //   let formattedDate = currentDate.toISOString().split(".")[0] + "Z";
  //   let selectedQ = "cryptocurrency";

  // Function to fetch videos from the proxy server
  const fetchVideos = async () => {
    try {
      const searchResponse = await axios.get(
        "https://crypto-venture-backend.onrender.com/api/youtube",
        {
          params: {
            regionCode: "US", // Optionally, pass regionCode
          },
        }
      );

      const videosWithCustomStats = searchResponse.data.items.map((video) => ({
        ...video,
        customStats: {
          views: Math.floor(Math.random() * 10000) + 500, // Random views count
          likes: Math.floor(Math.random() * 1000) + 50, // Random likes count
          comments: Math.floor(Math.random() * 500) + 10, // Random comments count
          shares: Math.floor(Math.random() * 500) + 10, // Random comments count
          liked: false, // Track if the video is liked by the user
        },
      }));

      const sortedVideos = videosWithCustomStats.sort(
        (a, b) =>
          new Date(b.snippet.publishedAt) - new Date(a.snippet.publishedAt)
      );

      setVideos(sortedVideos);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching videos:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos(); // Fetch videos from the proxy server
  }, []); // Only run once on component mount

  // Function to increase the like count
  const handleLike = (videoId) => {
    setVideos((prevVideos) =>
      prevVideos.map((video) => {
        if (video.id.videoId === videoId && !video.customStats.liked) {
          return {
            ...video,
            customStats: {
              ...video.customStats,
              likes: video.customStats.likes + 1,
              liked: true,
            },
          };
        }
        return video;
      })
    );
  };

  const timeAgo = (date) => {
    // const now = moment();
    const videoTime = moment(date);
    return videoTime.fromNow();
  };

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  const handleVideoClick = (videoId) => {
    setSelectedVideoId(videoId);

    // Scroll to the video player after a small delay
    setTimeout(() => {
      videoPlayerRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 200); // Delay in milliseconds to ensure the video section renders first
  };

  return (
    <div className="p-4 pt-[2rem]">
      {/* <h1 className="text-2xl font-bold text-center mb-6">
        Top Cryptocurrency Videos
      </h1> */}

      {selectedVideoId && (
        <>
          <div className="">
            <div ref={videoPlayerRef} className="mb-8">
              <div className="flex flex-row justify-between items-center">
                <h2 className="text-xl font-bold mb-4">Now Playing:</h2>
                <img
                  onClick={() => setSelectedVideoId(null)}
                  src={Close}
                  alt=""
                  className="w-[30px] h-[30px]"
                />
              </div>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  className="w-full h-64 md:h-96 lg:h-96"
                  src={`https://www.youtube.com/embed/${selectedVideoId}?modestbranding=1&rel=0&controls=1&showinfo=0`}
                  frameBorder="0"
                  allowFullScreen
                  title="YouTube Video Player"
                ></iframe>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div
            key={video.id.videoId}
            className="bg-white border-[2px] border-solid border-gray-400 rounded-lg overflow-hidden transform transition-transform duration-200 cursor-pointer"
            onClick={() => handleVideoClick(video.id.videoId)}
          >
            <img
              className="w-full h-48 object-cover"
              src={video.snippet.thumbnails.high.url}
              alt={video.snippet.title}
            />
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">
                {video.snippet.title.slice(0, 20)}
              </h3>
              <p className="text-[1.1rem] text-red-600 mb-[15px] mt-[15px] font-bold">
                Uploaded: {timeAgo(video.snippet.publishedAt)}
              </p>
              {/* <p className="text-blue-500 text-sm hover:underline">
                Play Video
              </p> */}

              <div className="flex justify-between items-center mt-4 text-black space-x-4">
                <div className="flex items-center cursor-pointer hover:text-purple-500">
                  <FaEye className="mr-2" />{" "}
                  <span className="font-bold">{video.customStats.views}</span>
                </div>

                <div className="flex items-center cursor-pointer hover:text-red-500">
                  <FaShare className="mr-2" />{" "}
                  <span>{video.customStats.views}</span>
                </div>

                <p
                  className={`text-sm flex items-center cursor-pointer ${
                    video.customStats.liked ? "text-red-500" : "text-black"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLike(video.id.videoId);
                  }}
                >
                  {video.customStats.liked ? (
                    <>
                      <img src={Heart} alt="" className="w-[30px] h-[30px]" />
                      <span className="font-bold">
                        {video.customStats.likes}
                      </span>
                    </>
                  ) : (
                    <div className="flex items-center cursor-pointer hover:text-blue-500">
                      <FaThumbsUp className="mr-2" />{" "}
                      <span className="font-bold">
                        {video.customStats.likes}
                      </span>
                    </div>
                  )}
                </p>

                {/* <p className="text-sm flex items-center">
                  <ChatBubbleOvalLeftEllipsisIcon className="w-5 h-5 mr-1" />
                  <span className="font-bold">
                    {video.customStats.comments}
                  </span>
                </p> */}
                <div className="flex items-center cursor-pointer hover:text-green-500">
                  <FaComment className="mr-2" />{" "}
                  <span> {video.customStats.comments}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testing;
