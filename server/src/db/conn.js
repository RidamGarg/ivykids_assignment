const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

url =
  "mongodb+srv://Ridam:nfPRX59KgubU1tRm@cluster0.c6lne.mongodb.net/MiniTwitterDb?retryWrites=true&w=majority" ||
  "mongodb://localhost:27017/miniTwitterDb";

mongoose
  .connect(url, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
  });
