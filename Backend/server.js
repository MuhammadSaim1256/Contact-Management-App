const express = require("express");
const connectBD = require("./config/db");
require("dotenv").config();
const app = express();

// connect DB
connectBD();

// define midleware
app.use(express.json({ extended: false }));

// Define routes
app.use("/api/user", require("./routes/user"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contact", require("./routes/contact"));

app.use("/", (req, res) => {
  res.send("Welcome to the Contact Management App");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}`);
});
