require("dotenv").config();
const express = require("express");
const app = express();
const cors = require('cors');
const connectDB = require("./config/db");
const routes = require("./routes");

connectDB();

// Define middleware here
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));
app.use(cors());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.get("/api", (req, res, next) => {
  res.send("Api running");
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