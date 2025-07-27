const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Opslagconfiguratie voor multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// In-memory opslag voor foto metadata
let photos = [];

app.post("/upload", upload.single("photo"), (req, res) => {
  const { description, discord_tag } = req.body;
  const tags = JSON.parse(req.body.tags || "[]");

  if (!req.file) {
    return res.status(400).json({ error: "Geen foto geüpload." });
  }

  const data = {
    filename: req.file.filename,
    url: `/uploads/${req.file.filename}`,
    description,
    discord_tag,
    tags,
    date: new Date().toISOString(),
  };

  photos.push(data);
  res.json({ message: "✅ Upload succesvol!", data });
});

// Haal alle foto's op
app.get("/photos", (req, res) => res.json(photos));

// Toon geüploade foto's
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`✅ Server draait op poort ${port}`));
