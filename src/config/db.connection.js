import mongoose from "mongoose";
import config from "./config.js";

const connectDB = async () => {
  try {
    //     const connectionInstance = await mongoose.connect(
    //       `${process.env.MONGODB_URI}/${DB_NAME}`
    //     );
    if (!config.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined");
    }

    const connectionInstance = await mongoose.connect(config.MONGODB_URI);
    console.log(
      `\nDatabase Connected Successfully! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("MONGODB CONNECTION ERROR:", error.message);
    return null;
  }
};

export default connectDB;
