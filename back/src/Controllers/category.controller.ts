import Category from "../Models/category.model.js";



import { Request, Response } from 'express';
import { validationResult } from 'express-validator';


class CategoryController {
    public async fetchCategories(req: Request, res: Response) {
        const categories = await Category.fetchCategories();
        res.json(categories);
    }
    
    public async createCategory(req: Request, res: Response) {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('errors: ', errors);
            return res.status(400).json({ errors: errors.array() });
        }
        // console.log('req.body', req.body);

        const { name } = req.body;

        try {
            const category = await Category.createCategory(name);
            res.status(201).json(category);
        } catch (error) {
            res.status(500).json({ message: 'Server Error' });
        }
    }
    public async deleteCategoryById(req: Request, res: Response) {
        const { id } = req.params;
        // console.log('id', id);

        try {
            const category = await Category.deleteCategoryById(id);
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }

            res.json(category);
        } catch (error) {

            res.status(500).json({ message: 'Server Error' });
        }

    }

    public async updateCategoryById(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('errors: ', errors);
            return res.status(400).json({ errors: errors.array() });
        }
        console.log('req.body', req.body);

        const { name } = req.body;
        const { id } = req.params;

        try {
            const category = await Category.updateCategoryById(id, name);
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }
            res.json(category);
        } catch (error) {
            res.status(500).json({ message: 'Server Error' });
        }
    }
}

export default CategoryController;