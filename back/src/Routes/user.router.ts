import express from 'express';
import { body, validationResult } from 'express-validator';

import UserController from '../Controllers/user.controller.js';
import { authenticateUser, checkNotAuthenticated } from '../middlewares/auth/auth.mw.js';

const router = express.Router();


router.get('/:id', UserController.fetchUserById);

router.post('/create', [
    body('username').notEmpty().withMessage('username is required').isLength({ min: 3 }).withMessage('username must be at least 3 characters long').escape(),
    body('email').notEmpty().withMessage('email is required').isEmail().withMessage('email is not valid').escape(),
    body('password').notEmpty().withMessage('password is required').isLength({ min: 8 }).withMessage('password must be at least 8 characters long'),
], checkNotAuthenticated, UserController.createUser);

router.post('/login', [
    body('email').notEmpty().withMessage('email is required').isEmail().withMessage('email is not valid').escape(),
    body('password').notEmpty().withMessage('password is required').isLength({ min: 8 }).withMessage('password must be at least 8 characters long'),
], checkNotAuthenticated, authenticateUser);
// UserController.checkCredentials




export default router;
