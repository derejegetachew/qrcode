const QRCode = require("qrcode");
const { createCanvas, loadImage } = require("canvas");
const fs = require("fs");

// Generate QR code with dynamic data
exports.generateQRCode = async (req, res) => {
  // Get dynamic data from the request body or query
  const {
    Merchant_Account_Information,
    Merchant_Tin_Number,
    Merchant_Bank,
    Merchant_Category_Code,
    Transaction_Currency,
    Country_Code,
    Merchant_Name,
    Merchant_City,
    Merchant_Phone_Nubmer,
    Store_Label,
    Merchant_Channel,
    Till_Id,
    Purpose,
    Tax_Number,
    Bill_Number,
  } = req.body || req.query;

  //   if (!n || !a || !d || !i) {
  //     return res.status(400).send("Missing required fields: n, a, d, i");
  //   }

  // Data for QR code
  const data = {
    Merchant_Account_Information,
    Merchant_Tin_Number,
    Merchant_Bank,
    Merchant_Category_Code,
    Transaction_Currency,
    Country_Code,
    Merchant_Name,
    Merchant_City,
    Merchant_Phone_Nubmer,
    Store_Label,
    Merchant_Channel,
    Till_Id,
    Purpose,
    Tax_Number,
    Bill_Number,
  };

  // Convert the data into string format
  const stringdata = JSON.stringify(data);

  // Canvas setup
  const canvasSize = 500; // Canvas size in pixels
  const canvas = createCanvas(canvasSize, canvasSize);
  const ctx = canvas.getContext("2d");

  // Generate the QR code on the canvas
  QRCode.toCanvas(
    canvas,
    stringdata,
    {
      errorCorrectionLevel: "m", // High error correction to accommodate logo
      margin: 1, // Margin around the QR code
      scale: 10, // Scale of the QR code
    },
    async function (err) {
      if (err) {
        console.error("Error generating QR code:", err);
        res.status(500).send("Error generating QR code");
        return;
      }

      try {
        // Load the logo
        const logo = await loadImage("../qrcode/images/abay_logo.png");

        // Calculate logo size and position
        const logoSize = canvasSize * 0.2; // 20% of canvas size
        const logoX = (canvasSize - logoSize) / 2;
        const logoY = (canvasSize - logoSize) / 2;

        // Draw the logo on the QR code
        ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);

        // Respond with the generated image
        // res.setHeader("Content-Type", "image/png");
        // canvas.createPNGStream().pipe(res);
        const out = fs.createWriteStream("qrcode_with_logo.png");
      const stream = canvas.createPNGStream();
      stream.pipe(out);
      out.on("finish", () =>
        console.log("QR code with logo saved as qrcode_with_logo.png")
      );
      } catch (loadErr) {
        console.error("Error loading logo:", loadErr);
        res.status(500).send("Error loading logo");
      }
    }
  );
};
