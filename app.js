process.loadEnvFile();
const express = require("express");
const app = express();
const connectDB = require("./Configs/connectDB.js");
const routes = require("./Routes/index.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes);

app.all("*", (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on the server.`);
  err.status = "Fail to load..";
  err.statusCode = 404;
  next(err);
});

app.use((error, req, res, next) => {
  error.statusCode = error.statusCode || 400;
  error.status = error.status || "Oops something went wrong!";
  res.status(error.statusCode).json({
    success: false,
    statusCode: error.statusCode,
    message: error.message,
    data: null,
  });
});

app.listen(process.env.PORT || 8080, () => {
  connectDB(process.env.DATABASE_URL);
  console.log(
    `Server is running on port number : ${process.env.PORT || 8080} `
  );
});
