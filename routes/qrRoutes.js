const express = require("express");
const { generateQRCode } = require("../Controllers/qrController");

const router = express.Router();

// Define the route for dynamic QR code generation
router.post("/generate-qr", generateQRCode);

module.exports = router;
