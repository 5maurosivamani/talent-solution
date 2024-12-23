const mongoose = require("mongoose");
const {dbUrl} = require("../config/appConfig");

const connectDB = async () => {
  try {
    // Use your MongoDB URI here
    const dbURI = dbUrl;

    // Connect to MongoDB using Mongoose
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit the application if database connection fails
  }
};

export default connectDB;
