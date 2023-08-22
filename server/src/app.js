if (process.env.NODE_ENV === "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const port = process.env.PORT == 8080 ? 3000 : process.env.PORT;
const cors = require("cors");
const path = require("path");

const router = require("./routers/profile");
require("../src/db/conn");
const { auth } = require("./middleware/auth");
// const { secure } = require("./middleware/secure");
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(
  cors({
    origin: "*",
  })
);

app.use("/auth", auth, require("./routers/profile"));
app.use("/secure", require("./routers/secure"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve("../client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve("../client", "build", "index.html"));
  });
}

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.listen(port, () => {
  console.log(`server is running at port no ${port}`);
});
