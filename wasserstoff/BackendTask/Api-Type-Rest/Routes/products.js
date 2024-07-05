import express from "express";
import { deleteProduct, getAllProduct, getProductdetails, newProduct, updateProduct } from "../Controllers/productController.js";

const router=express.Router();

router.route("/products").get(getAllProduct);
router.route("/product").post(newProduct);

router.route("/product/:id").get(getProductdetails);
router.route("/product/:id").put(updateProduct);
router.route("/product/:id").delete(deleteProduct);



export default router;

