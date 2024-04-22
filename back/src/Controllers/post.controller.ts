import Post from "../Models/post.model.js";
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';


class PostController {

    public async fetchSinglePostByTitle(req: Request, res: Response) {
        const title = req.params.title;
        try {
            const post = await Post.fetchSinglePostByTitle(title);
            res.json(post)
        } catch (error) {

            if (error instanceof Error) {
                // res.status(500).json({ message: error.message });
                console.error('fetchSinglePostByTitle ', error.message)

            } else {
                res.status(500).json({ message: 'Server Error' });

            }
        }
    }

    public async getRelatedPosts(req: Request, res: Response) {
        const { categoryID, tags } = req.body
        try {
            const posts = await Post.getRelatedPosts(categoryID, tags)
            res.json(posts)
        } catch (error) {
            if (error instanceof Error) {
                console.error('getRelatedPosts ', error.message)

            } else {
                res.status(500).json({ message: 'Server Error' });

            }
        }
    }
    public async fetchPaginatedPosts(req: Request, res: Response) {

        const page = parseInt(req.params.page);
        const pageSize = parseInt(req.params.pageSize);


        try {
            const posts = await Post.fetchPaginatedPosts(page, pageSize);

            const totalPosts = await Post.countDocuments();

            // console.log('fetchPaginatedPosts: ', posts);
            res.json({ posts, totalPosts });
        } catch (error) {
            if (error instanceof Error) {
                console.error('fetchPaginatedPosts ', error.message)

            } else {
                res.status(500).json({ message: 'Server Error' });

            }
        }
    }


    public async getCategoriesWithPostCounts(req: Request, res: Response) {


        try {
            const categoriesWithCount = await Post.getCategoriesWithPostCounts()

            res.json(categoriesWithCount)
        } catch (error) {
            if (error instanceof Error) {
                console.error('getCategoriesWithPostCounts ', error.message)

            } else {
                res.status(500).json({ message: 'Server Error' });

            }
        }
    }

    public async fetchPaginatedPostsByCategory(req: Request, res: Response) {
        const categoryName = req.params.categoryName;
        const page = parseInt(req.params.page);
        const pageSize = parseInt(req.params.pageSize);
        try {

            const postsByCategory = await Post.fetchPostsByCategory(categoryName, page, pageSize);

            res.json(postsByCategory);
        } catch (error) {
            if (error instanceof Error) {
                console.error('fetchPaginatedPostsByCategory ', error.message)

            } else {
                res.status(500).json({ message: 'Server Error' });

            }
        }
    }

    public async fetchPaginatedPostsByTag(req: Request, res: Response) {
        const tag = req.params.tag;
        const page = parseInt(req.params.page);
        const pageSize = parseInt(req.params.pageSize);

        try {
            const postsByTag = await Post.fetchPaginatedPostsByTag(tag, page, pageSize);

            res.json(postsByTag);
        } catch (error) {
            if (error instanceof Error) {
                console.error('fetchPaginatedPostsByTag ', error.message)

            } else {
                res.status(500).json({ message: 'Server Error' });

            }
        }
    }
    // public async fetchPosts(req: Request, res: Response) {
    //     try {
    //         const posts = await Post.fetchPosts();
    //         const totalPosts = await Post.countDocuments(); // Get the total number of posts

    //         res.json({ posts, totalPosts });

    //     } catch (error) {
    //         res.status(500).json({ message: 'Server Error' });
    //     }
    // }

    // public async fetchPostById(req: Request, res: Response) {
    //     const _id = req.params.id;

    //     try {
    //         const post = await Post.fetchPostById(_id);
    //         if (!post) {
    //             console.log('post oho')
    //             return res.status(404).json({ message: 'Post not found' });
    //         }
    //         res.json(post);
    //     } catch (error) {
    //         res.status(500).json({ message: 'Server Error' });
    //     }
    // }
    public async createPost(req: Request, res: Response) {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('errors: ', errors);
            return res.status(400).json({ errors: errors.array() });
        }
        // console.log('req.body', req.body);

        const { title, content, seoContent, readTime, tags, image, userID, categoryID } = req.body;

        try {
            const post = await Post.createPost(title, content, seoContent, readTime, tags, image, userID, categoryID);
            res.status(201).json(post);
        } catch (error) {
            if (error instanceof Error) {
                console.error('createPost ', error.message)
            } else {
                res.status(500).json({ message: 'Server Error' });

            }
        }
    }
    // public async deletePostById(req: Request, res: Response) {
    //     const { id } = req.params;
    //     // console.log('id', id);

    //     try {
    //         const post = await Post.deletePostById(id);
    //         if (!post) {
    //             return res.status(404).json({ message: 'Post not found' });
    //         }

    //         res.json(post);
    //     } catch (error) {

    //         res.status(500).json({ message: 'Server Error' });
    //     }

    // }

    // public async updatePostById(req: Request, res: Response) {
    //     const errors = validationResult(req);
    //     if (!errors.isEmpty()) {
    //         return res.status(400).json({ errors: errors.array() });
    //     }
    //     const { id } = req.params;
    //     const { title, content } = req.body;
    //     try {
    //         const post = await Post.updatePostById(id, title, content);
    //         res.status(201).json(post);

    //     } catch (error) {
    //         res.status(500).json({ message: 'Server Error' });
    //     }
    // }

    // public async findByTitle(req: Request, res: Response) {
    //     // console.log('findByTitle', req.params.title);
    //     const { title } = req.params;
    //     try {

    //         const posts = await Post.findByTitle(title);
    //         // console.log('posts', posts);
    //         res.json(posts);
    //     } catch (error) {
    //         console.log('error', error);
    //         res.status(500).json({ message: 'Server Error' });
    //     }

    // }

}

export default new PostController();
