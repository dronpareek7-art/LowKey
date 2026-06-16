import express from "express";
import dotenv from "dotenv";
dotenv.config();

import { ConnectToDB } from "./config/connect.js";
import ProductRouter from "./routes/product.routes.js";
import CategoryRouter from "./routes/category.routes.js";

await ConnectToDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api",ProductRouter)
app.use("/api",CategoryRouter)


app.listen(PORT, () => {
  console.log(`BackEnd Server Started On Port ${PORT}`);
});
