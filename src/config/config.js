import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;
const CORS_ORIGIN = process.env.CORS_ORIGIN;

export default { PORT, MONGODB_URI, CORS_ORIGIN };
