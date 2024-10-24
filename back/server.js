import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import axios from "axios";
import dotenv from "dotenv";
import blogRouter from "./routes/blogRoute.js";

const app = express();
const PORT = process.env.PORT || 4000;

// Enable CORS
app.use(cors());

// Load environment variables
dotenv.config();

app.use(express.json()); // Add this if missing
app.use(express.urlencoded({ extended: true }));

// function to show database is connected
connectDB();

const apiKeys = [
  process.env.YOUTUBE_API_KEY_1,
  process.env.YOUTUBE_API_KEY_2,
  process.env.YOUTUBE_API_KEY_3,
  process.env.YOUTUBE_API_KEY_4,
  process.env.YOUTUBE_API_KEY_5,
  process.env.YOUTUBE_API_KEY_6,
  process.env.YOUTUBE_API_KEY_7,
  process.env.YOUTUBE_API_KEY_8,
  process.env.YOUTUBE_API_KEY_9,
  process.env.YOUTUBE_API_KEY_10,
];

let currentKeyIndex = 0;

//api endpoint
app.use("/api/blog", blogRouter);
app.use("/images", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("API CREATED");
});

// Proxy route to fetch news from News API
app.get("/api/news", async (req, res) => {
  const category = req.query.q; // Get category from query params
  try {
    const response = await axios.get("https://newsapi.org/v2/everything", {
      params: {
        q: category,
        apiKey: process.env.NEWS_API_KEY, // Use News API key from .env
        sortBy: "publishedAt",
        language: "en",
      },
    });

    const filteredNews = response.data.articles.filter((article) => {
      // Basic check for English characters
      return /^[A-Za-z0-9\s.,'-]+$/.test(article.title);
    });

    res.json({ articles: filteredNews });
  } catch (error) {
    // Enhanced error logging for the News API
    console.error(
      "Error fetching news:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ message: "Error fetching news data", error });
  }
});

// Proxy route to fetch videos from YouTube API
// app.get("/api/youtube", async (req, res) => {
//   const query = "News related to crypto currency , bitcoin , Ethereum only in English"; // Default search query
//   const regionCode = req.query.regionCode || ""; // Optional regionCode filter

//   try {
//     const response = await axios.get(
//       "https://www.googleapis.com/youtube/v3/search",
//       {
//         params: {
//           part: "snippet",
//           q: query,
//           type: "video",
//           maxResults: 100,
//           key: process.env.YOUTUBE_API_KEY, // Use YouTube API key from .env
//         //   regionCode: regionCode, // Fix: use the variable instead of US
//         },
//       }
//     );

//     // Send the response data (videos) back to the frontend
//     res.json(response.data);
//   } catch (error) {
//     // Enhanced error logging for the YouTube API
//     console.error(
//       "Error fetching YouTube data:",
//       error.response ? error.response.data : error.message
//     );
//     res.status(500).json({ message: "Error fetching YouTube data", error });
//   }
// });

// Proxy route to fetch videos from YouTube API
app.get("/api/youtube", async (req, res) => {
  const query =
    "cryptocurrency"; // Default search query
  const regionCode = req.query.regionCode || ""; // Optional regionCode filter
  // let formattedDate = currentDate.toISOString().split('.')[0] + 'Z';


  // Recursive function to handle API key rotation and request retry
  const fetchYouTubeVideos = async (keyIndex) => {
    try {
      const response = await axios.get(
        "https://www.googleapis.com/youtube/v3/search",
        {
          params: {
            part: "snippet",
            // publishedAfter:formattedDate,
            q: query,
            type: "video",
            order: "date",
            maxResults: 50,
            key: apiKeys[keyIndex], // Use the current API key
            regionCode: regionCode, // Pass regionCode if available
          },
        }
      );

      // If the request is successful, send the data back to the client
      res.json(response.data);
    } catch (error) {
      // Handle quota exceeded error (403)
      if (error.response && error.response.status === 403) {
        console.error(`Quota exceeded for API key ${keyIndex + 1}`);

        // Check if we have more API keys to try
        if (keyIndex < apiKeys.length - 1) {
          console.log(`Switching to API key ${keyIndex + 2}`);
          // Retry with the next API key
          currentKeyIndex = keyIndex + 1;
          return fetchYouTubeVideos(currentKeyIndex);
        } else {
          // If no more API keys are available, return an error response
          return res
            .status(429)
            .json({ error: "All API keys have exceeded their quota." });
        }
      } else {
        // If it's not a quota error, send the actual error
        console.error("Error fetching YouTube videos:", error);
        return res
          .status(500)
          .json({
            error: "An error occurred while fetching data from YouTube.",
          });
      }
    }
  };

  // Start by using the current API key
  fetchYouTubeVideos(currentKeyIndex);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
