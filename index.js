const express = require("express");
const postRoutes = require("./routes/posts");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const draftRoutes = require("./routes/drafts");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const multer = require("multer");

const app = express();

const corsOptions = {
  origin: true, //included origin as true
  credentials: true //included credentials as true
};

const port = process.env.PORT || 8800;

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

app.use(cookieParser());
app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  }
});

const upload = multer({ storage });
app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file);
});

app.use("/api/drafts", draftRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log("Server is listening...");
});
