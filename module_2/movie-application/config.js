// Get the config either from environment variables or pick the default
const config = {
  PORT: process.env.PORT || "8000",
  JSON_SERVER_BASE_URL: process.env.JSON_SERVER_BASE_URL || "http://localhost:3000/movies"
}

module.exports = config;
