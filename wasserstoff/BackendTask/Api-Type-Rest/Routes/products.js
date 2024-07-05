import { getAllProduct } from "../Controllers/productController.js";

import express from "express";
const router=express.Router();

router.route("/product").get(getAllProduct);

export default router;

