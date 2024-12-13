const express = require("express");
const bodyParser = require("body-parser");
const qrRoutes = require("./routes/qrRoutes");

const app = express();
const port = 3000;

// Middleware to parse JSON body
app.use(bodyParser.json());

// Use routes
app.use("/api",qrRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
