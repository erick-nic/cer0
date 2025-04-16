import { Router } from "express";
import { authToken } from "../middlewares/auth.token";
import { addProducts, deleteProduct, getProducts, getProductsByCategory, updateProducts } from "../controllers/products.controller";
const router = Router();

router.post('/create-products', authToken, addProducts);
router.get('/get-products', getProducts);
router.get('/get-products/:id', getProducts);
router.get('/get-products/by-category/:id', getProductsByCategory);
router.put('/update-products/:id', authToken, updateProducts);
router.delete('/delete-products/:id', authToken, deleteProduct);

export default router