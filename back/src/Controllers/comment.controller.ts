import Comment from "../Models/comment.model.js";

import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import mongoose, { isValidObjectId } from "mongoose";
import { Schema } from "zod";


class CommentController {

    public async createComment(req: Request, res: Response) {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('errors: ', errors);
            return res.status(400).json({ errors: errors.array() });
        }
        // console.log('req.body', req.body);

        const { user, content, postID, replies = [] } = req.body;

        try {
            const comment = await Comment.createComment(user, content, postID, replies);
            res.status(201).json(comment);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });

            } else {
                res.status(500).json({ message: 'Server Error' });

            }
        }
    }

    public async addReply(req: Request, res: Response) {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('errors: ', errors);
            return res.status(400).json({ errors: errors.array() });
        }

        const { parentCommentId } = req.params;
        const { user, content } = req.body;

        try {
            const updatedComment = await Comment.addReplyToComment(parentCommentId, user, content);
            res.status(201).json(updatedComment);
        } catch (error) {
            res.status(500).json({ message: 'Server Error' });
        }
    }

    // public async deleteCommentById(req: Request, res: Response) {
    //     const { id } = req.params;
    //     // console.log('id', id);

    //     try {
    //         const comment = await Comment.deleteCommentById(id);
    //         if (!comment) {
    //             return res.status(404).json({ message: 'Comment not found' });
    //         }

    //         res.json(comment);
    //     } catch (error) {

    //         res.status(500).json({ message: 'Server Error' });
    //     }

    // }

    // public async fetchCommentsByPostId(req: Request, res: Response) {
    //     const { postID } = req.params;

    //     const comments = await Comment.fetchCommentsByPostId(postID);
    //     res.json(comments);
    // }
    public async fetchCommentsByPostId(req: Request, res: Response) {

        const { id } = req.params
        // console.log('postID', postID)
        // const postObjectId = new mongoose.Schema.Types.ObjectId(postID);

        try {
            const comments = await Comment.fetchCommentsByPostId(id);
            res.json(comments);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });

            } else {
                res.status(500).json({ message: 'Server Error' });

            }
        }
    }
    // public async fetchCommentsUnderParentComment(req: Request, res: Response) {


    //     const { parentID } = req.body


    //     try {
    //         if(!parentID){
    //         throw Error('please provide the id of the parent Comment')
    //         }
    //         const comments = await Comment.fetchCommentsUnderParentComment(parentID);
    //         res.json(comments);
    //     } catch (error) {
    //         if (error instanceof Error) {
    //             res.status(500).json({ message: error.message });
    //         } else {
    //             res.status(500).json({ message: 'Server Error' });
    //         }
    //     }
    // }
}

export default new CommentController();