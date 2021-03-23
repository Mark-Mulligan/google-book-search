require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
const routes = require("./routes");
const { default: axios } = require("axios");

connectDB();

// Define middleware here
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(cors());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.get("/api", (req, res, next) => {
  res.send("Api running");
});

app.post("/api/books/search", async (req, res) => {
  const { searchTerm } = req.body;

  try {
    const { data } = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${process.env.BOOKS_API_KEY}`
    );
    console.log(data);
    res.status(200).json({ success: true, data: data.items });
  } catch (error) {
    console.log(error);
  }
});

app.use(routes);

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () =>
  console.log(`Sever running on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});
