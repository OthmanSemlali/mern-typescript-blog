import mongoose, { Schema, Document, Model } from "mongoose";
import Category from "./category.model.js";
import { IPost, IPostWithoutContent } from "../Interfaces/post.interface.js";
import slugify from "slugify";
import { marked } from "marked";
import createDomPurify from 'dompurify'
import {JSDOM} from 'jsdom'

const dompurify = createDomPurify(new JSDOM().window)
type CategoryWithPostCount = {
    category: string;
    count: number;
};

// type TPostTitleSearch = Omit<IPost, 'image' | 'userID' | 'categoryID'>;

interface IPostModel extends Model<IPost> {
    // findByTitle(title: string): Promise<TPostTitleSearch | null>;
    fetchPaginatedPosts(page: number, pageSize: number): Promise<IPost[] | null>;
    // fetchPosts(): Promise<IPost[] | []>;
    // fetchPostById(postId: string): Promise<IPost | null>;
    createPost(title: string, content: string, seoContent: string, readTime: string, tags: string[], imgae: string, userID: Schema.Types.ObjectId, categoryID: Schema.Types.ObjectId): Promise<IPost | null>;
    // deletePostById(id: string): Promise<IPost | null>;
    // updatePostById(id: string, title: string, content: string): Promise<IPost | null>;
    getCategoriesWithPostCounts(): Promise<CategoryWithPostCount[] | null>;
    fetchPostsByCategory(categoryName: string, page: number, pageSize: number): Promise<{ posts: IPostWithoutContent[] | [], totalPosts: number }>;
    fetchPaginatedPostsByTag(tag: string, page: number, pageSize: number): Promise<{ posts: IPostWithoutContent[] | [], totalPosts: number }>
    fetchSinglePostByTitle(title: string): Promise<IPost | null>
    getRelatedPosts(categoryId: Schema.Types.ObjectId, tags: string[]): Promise<IPost[] | null>
}



const PostSchema: Schema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    seoContent: { type: String },
    readTime: { type: String },
    tags: [{ type: String }],
    image: { type: String, require: true },
    userID: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    categoryID: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    // slug: {type:String, required:true}
    sanitizedHtml: { type: String, required: true }

},
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: function (doc, ret, options) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
                return ret;
            }
        }
    });


// PostSchema.pre('validate', function (next) {
//     if (this.title) {
//         console.log('this.title', this.title)
//         // this.slug = slugify('')
//         this.title = slugify(this.title)
//     }

//     if(this.content){
//         this.sanitizedHtml = dompurify.sanitize(marked(this.content))
//     }
// })

PostSchema.pre('validate', async function (next) {
    if (this.title) {
        console.log('this.title', this.title);
        // this.slug = slugify('');
    }

    if (typeof this.content === 'string') {
        try {
            // Call the marked function with the content string
            this.sanitizedHtml = marked(this.content);
        } catch (error) {
            console.error('Error parsing Markdown:', error);
            // Handle error, e.g., set sanitizedHtml to an empty string or default value
            this.sanitizedHtml = '';
        }
    } else if (this.content instanceof Promise) {
        // If content is a Promise<string>, await its resolution
        try {
            const resolvedContent = await this.content;
            // Call the marked function with the resolved content string
            this.sanitizedHtml = marked(resolvedContent);
        } catch (error) {
            console.error('Error parsing Markdown:', error);
            // Handle error, e.g., set sanitizedHtml to an empty string or default value
            this.sanitizedHtml = '';
        }
    }

    next();
});
//virtuals
/*
PostSchema.virtual('id').get(function (this: IPost) {
    return this._id;
});
*/

// Indexing
// PostSchema.index({ title: 'text', content: 'text' });


// PostSchema.index({ title: 'text' });
PostSchema.index({ title: 1 });


// PostSchema.statics.createPost = async function(title: string, content: string,  userID: string, categoryID: string,):Promise<IPost> {
//     return this.create({ title, content, userID, categoryID});
// }

class PostClass {
    public static async fetchSinglePostByTitle(this: IPostModel, title: string) {

        console.log('title', title)
        try {
            // Use await to wait for the findOne operation to complete
            const post = await this.findOne({ title }).populate('userID', 'username').populate('categoryID', 'name').exec();
            return post;
        } catch (error) {
            console.error("Error fetching post by title:", error);
            throw new Error("Failed to fetch post by title");
        }
    }

    public static async getRelatedPosts(this: IPostModel, categoryID: Schema.Types.ObjectId, tags: string[]) {
        // Query the database to find posts matching the provided category and tags

        console.log('categoryID', categoryID)
        console.log('first', tags)
        const relatedPosts = await this.find({
            $or: [
                { categoryID: categoryID },
                { tags: { $in: tags } }
            ]
        }).limit(3).select('title');

        return relatedPosts;
    }

    public static async getCategoriesWithPostCounts(this: IPostModel) {
        try {
            const categoriesWithCounts = await this.aggregate([
                {
                    $group: {
                        _id: '$categoryID',
                        count: { $sum: 1 }
                    }
                },
                {
                    $lookup: {
                        from: 'categories',
                        localField: '_id',
                        foreignField: '_id',
                        as: 'category'
                    }
                },
                {
                    $project: {
                        _id: 0,
                        category: { $arrayElemAt: ['$category.name', 0] },
                        count: 1
                    }
                }
            ]);

            return categoriesWithCounts;
        } catch (error) {
            console.error('Error retrieving categories with post counts:', error);
            throw error;
        }
    }
    // public static async fetchPaginatedPosts(this: IPostModel, page: number, pageSize: number) {
    //     const skip = (page - 1) * pageSize;

    //     try {


    //         // Use Mongoose to query the database for paginated posts
    //         const posts = await this.find().skip(skip).limit(pageSize).exec();
    //         // const totalPosts = await Post.countDocuments(); // Get the total number of posts
    //         // const totalPages = Math.ceil(totalPosts / pageSize);
    //         return posts;
    //     } catch (error) {
    //         // Handle errors
    //         throw new Error('Failed to fetch paginated posts');
    //     }
    // }

    public static async fetchPaginatedPosts(this: IPostModel, page: number, pageSize: number) {
        const skip = (page - 1) * pageSize;


        return await this.find()
            .skip(skip)
            .limit(pageSize)
            // .populate('categoryID', 'name') // Populate the categoryID field with the category document and select only the 'name' field
            .populate('userID', 'username')
            .select('title seoContent readTime tags image createdAt userID')
            .exec();

        // Return the posts with category name


        // return posts;
        // } catch (error) {
        //     // Handle errors
        //     throw new Error('Failed to fetch paginated posts');
        // }
    }

    // public static async fetchPosts(this: IPostModel) {
    //     return this.find();
    // }
    // static fetchPostById(this: IPostModel, _id: string) {
    //     return this.findOne({ _id });
    // }

    //     static async fetchPostById(this: IPostModel, _id: string) {

    //         console.log('fetch')
    //         try {
    //             const post = await this.findById(_id);
    //             console.log('post', post)

    //             if (post !== undefined) {
    //                 return post; // Return null if post is not found

    //             }
    //             return null
    //         } catch (error) {
    //             throw new Error(`Error fetching post with ID ${_id}`);
    //     }
    // }
    // try {
    //     const post = await this.findOne({ _id });

    //     console.log('post in model', post)
    //     if (!post) {
    //         throw new Error(`Post with ID ${_id} not found`);
    //         // return 0
    //     }
    //     return post;
    // } catch (error) {
    //     // Handle the error, e.g., log it or throw a custom error
    //     throw new Error(`Error fetching post with ID ${_id}`);
    // }

    static async fetchPostsByCategory(this: IPostModel, categoryName: string, page: number, pageSize: number) {
        // try {
        // Find the category ID based on the category name
        const category = await Category.findOne({ name: categoryName });
        if (!category) {
            console.log("category not found");

            // throw new Error('Category not found');

            return null

        }

        console.log("category found", category);


        const skip = (page - 1) * pageSize;

        // First query to fetch paginated posts
        const postsQuery = this.find({ categoryID: category._id })
            .skip(skip)
            .limit(pageSize)
            .populate('userID', 'username')
            .select('title seoContent readTime tags image userID');

        const countQuery = this.countDocuments({ categoryID: category._id });

        // Execute both queries in parallel using Promise.all
        const [posts, totalPosts] = await Promise.all([postsQuery.exec(), countQuery.exec()]);

        console.log('posts by cat ', posts)
        return { posts, totalPosts };

    }

    static async fetchPaginatedPostsByTag(this: IPostModel, tag: string, page: number, pageSize: number) {
        // try {
        // Find the category ID based on the category name


        const skip = (page - 1) * pageSize;

        // First query to fetch paginated posts
        const postsQuery = this.find({ tags: tag })
            .skip(skip)
            .limit(pageSize)
            .populate('userID', 'username')
            .select('title seoContent readTime tags image userID');



        // Second query to count the total number of posts with the specified category
        const countQuery = this.countDocuments({ tags: tag });

        // Execute both queries in parallel using Promise.all
        const [posts, totalPosts] = await Promise.all([postsQuery.exec(), countQuery.exec()]);

        if (totalPosts == 0) {
            return null
        }
        return { posts, totalPosts };

    }

    static createPost(this: IPostModel, title: string, content: string, seoContent: string, readTime: string, tags: string[], image: string, userID: Schema.Types.ObjectId, categoryID: Schema.Types.ObjectId) {
        return this.create({ title, content, seoContent, readTime, tags, image, userID, categoryID });
    }
    // static deletePostById(this: IPostModel, _id: string) {
    //     return this.findOneAndDelete({ _id });
    // }

    // static updatePostById(this: IPostModel, _id: string, title: string, content: string) {
    //     return this.findOneAndUpdate({ _id }, { title, content }, { new: true });
    // }

    // static findByTitle(this: IPostModel, title: string, limit: number = 10) {
    //     return this.find({ $text: { $search: title } }).select('_id title createdAt').limit(limit);
    // }

}

PostSchema.loadClass(PostClass);

const Post = mongoose.model<IPost, IPostModel>('Post', PostSchema);
export default Post;
// PostSchema.static.createPost = async function (title: string, content: string, userID: string, categoryID: string, imageUrl?: string) {
//     return this.create({ title, content, userID, categoryID, imageUrl});
// }

// PostSchema.statics.createCategory = async function (name: string): Promise<ICategory> {
//     return this.create({ name });
// };



//Populate
/*
PostSchema.methods.getCategoryName = function() {
    return this.populate('categoryId').execPopulate()
        .then((post) => {
            // Now, post.categoryId is the actual Category document
            return post.categoryId.name;
        })
        .catch((error) => {
            console.error(error);
        });
};
*/