import { Router } from "express";
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../controllers/product.controller.js";
import { isAdmin } from "../middleware/admin.check.js";
const router = Router();

// Public Routes 
router.get('/get', getAllProducts);
router.get('/get/:id', getProductById);

// Admin Routes
router.post('/create', isAdmin, createProduct);
router.put('/update/:id', isAdmin, updateProduct);
router.delete('/delete/:id', isAdmin, deleteProduct);


export default router;