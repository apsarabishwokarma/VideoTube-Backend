import app from "./app.js";
import config from "./config/config.js";
import connectDB from "./config/db.connection.js";

connectDB()
  //this is async function so it returns promise so we can use then and catch
  .then(() => {
    app.listen(config.PORT, () => {
      console.log(`Server running at port ${config.PORT}`);
    });
    app.on("error", (error) => {
      // to listen the error of server
      // like : Port 5000 already in use
      console.log("ERROR:", error);
    });
  })
  .catch((err) => {
    // to catch the error while connecting with db
    console.log("MONGODB CONNECTION FAILED !", err);
  });
