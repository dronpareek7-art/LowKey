import express from "express";
import { GetProducts, AddProduct, AddBulkProducts, UpdateProduct, DeleteProduct } from "../controller/product.controller.js";

const router = express.Router();

router.get("/products", GetProducts);

router.post("/products", AddProduct);

router.post("/products/addbulk", AddBulkProducts);

router.put("/products/:id", UpdateProduct);

router.delete("/products/:id", DeleteProduct);

export default router;
