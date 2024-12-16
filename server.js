const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Path to sites.json
const sitesFilePath = path.join(__dirname, "sites.json");

// API to check site status
app.get("/check-site", (req, res) => {
  const hostname = req.query.hostname; // Get hostname from the query

  fs.readFile(sitesFilePath, (err, data) => {
    if (err) {
      console.error("Error reading sites file:", err);
      return res.status(500).json({ status: "error", message: "Server error" });
    }

    const sites = JSON.parse(data);
    const isActive = sites[hostname] || false; // Default to false if not found

    res.json({ active: isActive });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



app.use(cors()); // Enable CORS for all routes
