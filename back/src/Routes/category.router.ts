import express from 'express';
import { body } from 'express-validator';

import CategoryController from '../Controllers/category.controller.js';

const router = express.Router();

const Category = new CategoryController();

router.get('/', Category.fetchCategories);

router.post('/create', [
    body('name').notEmpty().withMessage('Name is required').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long').escape(),
], Category.createCategory);

router.delete('/:id', Category.deleteCategoryById);

router.put('/:id', [
    body('name').notEmpty().withMessage('Name is required').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long').escape(),
], Category.updateCategoryById);

export default router;
