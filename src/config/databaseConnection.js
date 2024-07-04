const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

async function connectDB() {
  try {
    console.log(process.env.DB_URL);
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
    });
    console.log("Successfully connected to MongoDB database");
  } catch (err) {
    console.error("Error while connecting to the database.", err);
  }
}

connectDB();

module.exports = mongoose;
