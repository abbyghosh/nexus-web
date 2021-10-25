require("dotenv").config();
const mongoose = require("mongoose");

//connect to DB
const dbUri =
  "mongodb+srv://abhishek:abhihandyweb@cluster0.o14sp.mongodb.net/moviesDb?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to DB!!");
  } catch (err) {
    console.error("Error connecting to DB!! -> ", err);
    process.exit(1);
  }
};

module.exports = connectDB;
