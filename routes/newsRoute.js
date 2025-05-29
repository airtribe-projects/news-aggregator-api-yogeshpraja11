const express = require("express");
const axios = require("axios");
const auth = require("../middleware/auth");

const router = express.Router();

// Get news (protected route)
router.get("/", auth, async (req, res) => {
  try {
    const {category = "general", country = "us", q} = req.query;

    // Build NewsAPI URL
    let url = `https://newsapi.org/v2/top-headlines?apiKey=${process.env.NEWS_API_KEY}`;

    if (q) {
      url += `&q=${encodeURIComponent(q)}`;
    } else {
      url += `&category=${category}&country=${country}`;
    }

    // Fetch news from NewsAPI
    const response = await axios.get(url);

    if (response.data.status === "error") {
      return res.status(400).json({message: response.data.message});
    }

    res.json({
      message: "News fetched successfully",
      totalResults: response.data.totalResults,
      articles: response.data.articles.map((article) => ({
        title: article.title,
        description: article.description,
        url: article.url,
        urlToImage: article.urlToImage,
        publishedAt: article.publishedAt,
        source: article.source.name,
      })),
    });
  } catch (error) {
    console.error("News API Error:", error.response?.data || error.message);
    res.status(500).json({
      message: "Failed to fetch news",
      error: error.response?.data?.message || error.message,
    });
  }
});

// Search news (protected route)
router.get("/search", auth, async (req, res) => {
  try {
    const {q, language = "en"} = req.query;

    if (!q) {
      return res.status(400).json({message: "Search query is required"});
    }

    const url = `https://newsapi.org/v2/everything?apiKey=${
      process.env.NEWS_API_KEY
    }&q=${encodeURIComponent(q)}&language=${language}`;

    const response = await axios.get(url);

    if (response.data.status === "error") {
      return res.status(400).json({message: response.data.message});
    }

    res.json({
      message: "Search results fetched successfully",
      totalResults: response.data.totalResults,
      articles: response.data.articles.slice(0, 20).map((article) => ({
        title: article.title,
        description: article.description,
        url: article.url,
        urlToImage: article.urlToImage,
        publishedAt: article.publishedAt,
        source: article.source.name,
      })),
    });
  } catch (error) {
    console.error("News Search Error:", error.response?.data || error.message);
    res.status(500).json({
      message: "Failed to search news",
      error: error.response?.data?.message || error.message,
    });
  }
});

module.exports = router;
