import mongoose from "mongoose";
import config from "./config.js";

const connectDB = async () => {
  try {
    //     const connectionInstance = await mongoose.connect(
    //       `${process.env.MONGODB_URI}/${DB_NAME}`
    //     );
    const connectionInstance = mongoose.connect(config.MONGODB_URI);
    console.log(
      `\n Database Connected Successfully! DB HOST:${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB CONNECTION ERROR", error.message);
    process.exit(1);
  }
};

export default connectDB;
