import express, { request, response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import * as productRoute from "./routes/productRoute.js";
import userRouter from "./routes/userRoute.js";

dotenv.config();
const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (request, response) => {
  return response
    .status(234)
    .send("This port is a server for my e-commerce app");
});

app.use(productRoute.productRouter);
app.use(userRouter);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("App connected to database");
    app.listen(process.env.PORT, () => {
      console.log(`App is listening to port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
