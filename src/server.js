const express = require("express");
const env = require("dotenv");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

//routes
const authRoutes = require("./routes/user");
env.config();

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASS}@danhvan.2djal.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => {
    console.log("Connecting mongodb...");
  });

app.use(cors());
app.use(express.json());
app.use("/api", authRoutes);

app.listen(`${process.env.PORT}`, () => {
  console.log(`Server is running...`);
});