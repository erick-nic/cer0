import { Router } from 'express';
import { createCategory, getCategorys, updateCategory, deleteCategory } from '../controllers/category.controller';

const router = Router();

router.post('/create-category', createCategory);
router.get('/get-categories', getCategorys);
router.get('/get-categories/:id', getCategorys);
router.put('/update-category/:id', updateCategory);
router.delete('/delete-category/:id', deleteCategory);

export default router;