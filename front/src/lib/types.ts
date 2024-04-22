export interface Post {
    id: string;
    title: string;
    seoContent: string;
    readTime: string;
    tags: string[];

    image: string;
    userID: {
        username: string,
        id: string
    };
    sanitizedHtml: string
    createdAt: string
    categoryID?: { name: string, id: string }
    content?: string;


    // Add more properties as needed
}

export interface PostState {
    posts: Post[];
    totalPosts: number;
    singlePost: Post | null;
    loading: boolean;
    error: string | null;
    errorStatus: number | null
}

export type Category = {
    category: string;
    count: number
}
export interface CategoryState {
    categoriesWithCounts: Category[],
    loading: boolean;
    error: string | null;
}
export type userComment = { name: string, email: string }
export type reply = {
    user: userComment,
    content: string
}
export interface Comment {
    id: string,
    user: userComment,
    content: string,
    postID: string,
    replies: reply[]
    createdAt: string

}

export interface CommentState {
    comments: Comment[],
    loading: boolean,
    add_comment_is_loading:boolean,
    add_reply_is_loading:boolean,
    error: string | null,
    errorStatus:number | null
}
export type CategoryAction =
    | { type: 'FETCH_CATEGORIES_REQUEST' }
    | { type: 'FETCH_CATEGORIES_SUCCESS'; payload: Category[] }
    | { type: 'FETCH_CATEGORIES_FAILURE'; payload: string }

export type CommentAction =
    | { type: 'FETCH_COMMENTS_REQUEST' }
    | { type: 'FETCH_COMMENTS_SUCCESS'; payload: Comment[] }
    | { type: 'FETCH_COMMENTS_FAILURE'}
    | {type:'ADD_COMMENT_REQUEST'}
    | {type:'ADD_COMMENT_SUCCESS', payload:Comment}
    | {type: 'ADD_COMMENT_FAILURE'}
    | {type:'ADD_REPLY_REQUEST'}
    | {type:'ADD_REPLY_SUCCESS', payload:Comment}
    | {type: 'ADD_REPLY_FAILURE'}



export type PostAction =
    | { type: 'FETCH_POSTS_REQUEST' }
    | { type: 'FETCH_POSTS_SUCCESS'; payload: { posts: Post[], totalPosts: number } }
    | { type: 'FETCH_POSTS_FAILURE' }
    | { type: 'FETCH_POST_REQUEST' }
    | { type: 'FETCH_POST_SUCCESS'; payload: Post }
    | { type: 'FETCH_POST_FAILURE' }
    | { type: 'CREATE_POST_REQUEST' }
    | { type: 'CREATE_POST_SUCCESS'; payload: Post }
    | { type: 'CREATE_POST_FAILURE' }
    | { type: 'UPDATE_POST_REQUEST' }
    | { type: 'UPDATE_POST_SUCCESS'; payload: Post }
    | { type: 'UPDATE_POST_FAILURE' }
    | { type: 'DELETE_POST_REQUEST' }
    | { type: 'DELETE_POST_SUCCESS'; payload: string }
    | { type: 'DELETE_POST_FAILURE' }
    | { type: 'FETCH_POST_FROM_LOCAL_STATE'; payload: string }
    | { type: 'FETCH_POSTS_BY_FILTER_REQUEST' }
    | { type: 'FETCH_POSTS_BY_FILTER_SUCCESS'; payload: { posts: Post[], totalPosts: number } }
    | { type: 'FETCH_POSTS_BY_FILTER_FAILURE' }
