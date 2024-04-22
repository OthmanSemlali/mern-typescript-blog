//post routers
import express from 'express';
import { body, validationResult } from 'express-validator';
import postController from '../Controllers/post.controller.js';
import { checkAuthenticated } from '../middlewares/auth/auth.mw.js';

const router = express.Router();

router.get('/fetchPaginatedPosts/:page/:pageSize', postController.fetchPaginatedPosts);
router.get('/fetchPaginatedPostsByCategory/:categoryName/:page/:pageSize', postController.fetchPaginatedPostsByCategory)
router.get('/fetchPaginatedPostsByTag/:tag/:page/:pageSize', postController.fetchPaginatedPostsByTag)
router.get('/fetchSinglePostByTitle/:title', postController.fetchSinglePostByTitle);

router.get('/getCategoriesWithPostCounts', postController.getCategoriesWithPostCounts)
// router.get('/', postController.fetchPosts);
router.get('/getRelatedPosts', postController.getRelatedPosts)
// router.get('/:title', postController.fetchPostById);

// router.get('/search/:title', postController.findByTitle);
router.post('/create', [
    body('title').notEmpty().withMessage('Title is required').isLength({ min: 5 }).withMessage('title must be alteas 5 chars long').escape(),
    body('content').notEmpty().withMessage('Content is required').isLength({ min: 10 }).withMessage('Content must be at least 10 characters long').escape(),
    body('seoContent').notEmpty().withMessage('seoContent is required').escape(),
    body('readTime').notEmpty(),
    body('tags').notEmpty(),
], postController.createPost);

// router.delete('/:id', postController.deletePostById);
// router.put('/:id', [
//     body('title').notEmpty().withMessage('Title is required').escape(),
//     body('content').notEmpty().withMessage('Content is required').isLength({ min: 10 }).withMessage('Content must be at least 10 characters long').escape(),
// ], postController.updatePostById);

export default router;