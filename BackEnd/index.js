import express from "express";
import dotenv from "dotenv";
dotenv.config();
import router from "./routes/product.routes.js";
import { ConnectToDB } from "./config/connect.js";
import VariantRouter from "./routes/product_variant.routes.js";

await ConnectToDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api",router)
app.use("/api",VariantRouter)



app.listen(PORT, () => {
  console.log(`BackEnd Server Started On Port ${PORT}`);
});
