
import { CategoryAction, CategoryState, CommentAction, CommentState } from "../lib/types";


const commentReducer = (state: CommentState, action: CommentAction): CommentState => {
    switch (action.type) {
        case 'FETCH_COMMENTS_REQUEST':
            return { ...state, loading: true, error: null };
        case 'ADD_COMMENT_REQUEST':
            return { ...state, add_comment_is_loading:true }

        case 'ADD_REPLY_REQUEST':
            return {...state, add_reply_is_loading:true}

        case 'FETCH_COMMENTS_SUCCESS':

            return { ...state, loading: false, comments: action.payload, error: null };


        //     case 'FETCH_POST_FROM_LOCAL_STATE':
        //         const singlePost = state.posts.find((p) => p.id == action.payload);
        //         return { ...state, loading: false, singlePost: singlePost || null, error: null }
        //     case 'FETCH_POST_SUCCESS':
        //         return { ...state, loading: false, singlePost: action.payload, error: null };


        case 'ADD_COMMENT_SUCCESS':
            return { ...state, add_comment_is_loading:false, comments: [...state.comments, action.payload], error: null };
        //     case 'UPDATE_POST_SUCCESS':
        //         const updatedPosts = state.posts.map(post =>
        //             post.id === action.payload.id ? { ...post, ...action.payload } : post
        //         );
        //         return { ...state, loading: false, posts: updatedPosts, error: null };
        //     case 'DELETE_POST_SUCCESS':
        //         const filteredPosts = state.posts.filter(post => post.id !== action.payload);
        //         return { ...state, loading: false, posts: filteredPosts, error: null };

        case 'ADD_REPLY_SUCCESS':
            const {postID, replies, id} = action.payload
            console.log('action.payload', postID, replies)

            const updatedComments = state.comments.map(comment => {
                if (comment.id === id) {
                  return {
                    ...comment,
                    replies:[...replies], 
                  };
                }
                return comment;
              });
            
              return {
                ...state,
                add_reply_is_loading:false,
                comments: updatedComments,
              };
        case 'FETCH_COMMENTS_FAILURE':
        case 'ADD_REPLY_FAILURE':
        case 'ADD_COMMENT_FAILURE':

            return { ...state, comments: [], add_comment_is_loading:false,add_reply_is_loading:false, loading: false, error: 'Internal Server Error', errorStatus: 500 };
        default:
            return state;
    }
};

export default commentReducer;
