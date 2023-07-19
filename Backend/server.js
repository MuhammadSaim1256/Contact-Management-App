const express = require("express");
const connectBD = require("./config/db");
const app = express();

// connect DB
connectBD();

// Define routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contact", require("./routes/contact"));

app.use("/", (req, res) => {
  res.send("Welcome to the Contact Management App");
});

const PORT = 8020;

app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}`);
});
