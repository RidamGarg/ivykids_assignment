const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

url = process.env.DBurl || "mongodb://localhost:27017/miniTwitterDb";

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
