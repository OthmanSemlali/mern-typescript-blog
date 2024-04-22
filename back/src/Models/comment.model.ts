import mongoose, { Schema, Document, Model, Mongoose } from "mongoose";

type userComment = {
    name: string,
    email: string,
}
type ObjectId = Schema.Types.ObjectId
interface IComment extends Document {
    user: userComment,
    content: string,
    postID: { type: ObjectId, ref: 'Post', required: true },
    replies?: (IComment[] | null)

    // parentID: { type: ObjectId, ref: 'Comment' }
}

interface ICommentModel extends Model<IComment> {
    createComment(user: userComment, content: string, postID: ObjectId, replies: IComment[] | []): Promise<IComment | null>;
    addReplyToComment(parentCommentId: string, user: userComment, content: string): Promise<IComment | null>;
    deleteCommentById(id: string): Promise<IComment | null>;
    fetchCommentsByPostId(postId: string): Promise<IComment[] | []>;
    // fetchCommentsUnderParentComment(parentID: ObjectId): Promise<IComment[] | []>
}

const CommentSchema: Schema = new Schema({
    user: { type: Object, required: true },
    content: { type: String, required: true },
    postID: { type: Schema.Types.ObjectId, required: true },
    replies: { type: Object }
    // parentID: { type: Schema.Types.ObjectId, default: null }
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

//virtuals
/*
PostSchema.virtual('id').get(function (this: IPost) {
    return this._id;
}); 
*/

// Indexing
// PostSchema.index({ title: 'text', content: 'text' });

CommentSchema.statics.createComment = async function (user: userComment, content: string, postID: ObjectId, replies: IComment[] | []): Promise<IComment> {
    return this.create({ user, content, postID, replies });
};

CommentSchema.statics.addReplyToComment = async function (parentCommentId: string, user: userComment, content: string) {
    // try {
    // const parentComment = await this.findById(parentCommentId);
    // if (!parentComment) {
    //     throw new Error('Parent comment not found');
    // }

    const reply = {
        user,
        content
    }
    console.log('reply', reply)
   
    try {
        const updatedComment = await Comment.findByIdAndUpdate(
          parentCommentId,
          { $push: { replies: reply } },
          { new: true } // To return the updated document
        );
    
        if (!updatedComment) {
          throw new Error('Parent comment not found');
        }
    
        return updatedComment;
      } catch (error) {
        throw new Error('server error');
      }
    // } catch (error) {
    //   throw new Error('Could not add reply to comment: ' + error.message);
    // }
}

CommentSchema.statics.deleteCommentById = async function (id: string): Promise<IComment | null> {
    return this.findByIdAndDelete(id);
};


CommentSchema.statics.fetchCommentsByPostId = async function (postID: string): Promise<IComment | null> {
    return await this.find({ postID });
};


// CommentSchema.statics.fetchCommentsUnderParentComment = async function (parentID: ObjectId): Promise<IComment[] | []> {
//     const comments = await this.find({ parentID});
//     return comments || [];

// }
const Comment = mongoose.model<IComment, ICommentModel>('Comment', CommentSchema);

export default Comment;