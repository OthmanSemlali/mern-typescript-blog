import express from 'express';
import { body } from 'express-validator';

import commentController from '../Controllers/comment.controller.js';

const router = express.Router();

router.post('/create', [
    body('user.name').notEmpty().escape(),
    body('user.email').notEmpty().isEmail().escape(),
    body('content').notEmpty().withMessage('Content is required').isLength({ min: 10 }).withMessage('Content must be at least 10 characters long').escape(),
    body('postID').notEmpty().withMessage('postID is required').escape()
    // body('replies')
], commentController.createComment);

// router.delete('/:id', commentController.deleteCommentById);

router.get('/fetchCommentsByPostId/:id', commentController.fetchCommentsByPostId);
// router.get('/fetchCommentsUnderParentComment', commentController.fetchCommentsUnderParentComment)

router.post('/addReply/:parentCommentId', commentController.addReply)
export default router;