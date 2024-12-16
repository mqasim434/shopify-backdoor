const fs = require("fs");
const path = require("path");

// Path to sites.json
const sitesFilePath = path.join(__dirname, "sites.json");

module.exports = (req, res) => {
  const { hostname } = req.query;

  fs.readFile(sitesFilePath, (err, data) => {
    if (err) {
      console.error("Error reading sites file:", err);
      return res.status(500).json({ status: "error", message: "Server error" });
    }

    const sites = JSON.parse(data);
    const isActive = sites[hostname] || false;

    res.status(200).json({ active: isActive });
  });
};
