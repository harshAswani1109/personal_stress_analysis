const express = require("express");
const path = require("path");
const compression = require("compression");
const app = express();

const PORT = process.env.PORT || 3001;
app.use(compression());

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/dass", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "dass.html"));
});

app.get("/vitals", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "vitals.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
