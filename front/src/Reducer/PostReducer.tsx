// PostReducer.tsx
// import { Action, PostState } from './PostContext';

import { PostAction, PostState } from "../lib/types";

const postReducer = (state: PostState, action: PostAction): PostState => {
    switch (action.type) {
        case 'FETCH_POSTS_REQUEST':
        case 'FETCH_POST_REQUEST':
        case 'CREATE_POST_REQUEST':
        case 'UPDATE_POST_REQUEST':
        case 'DELETE_POST_REQUEST':
        case 'FETCH_POSTS_BY_FILTER_REQUEST':
            return { ...state, loading: true, error: null, errorStatus: null };
        case 'FETCH_POSTS_SUCCESS':

            const { posts, totalPosts } = action.payload;
            if (posts.length == 0) {
                return { ...state, loading: false, error: 'No posts available' };
            }
            return { ...state, loading: false, posts: posts, totalPosts: totalPosts, error: null };

        case 'FETCH_POSTS_BY_FILTER_SUCCESS':

            // return null if the category or tag not found
            if (action.payload) {
                if (action.payload.posts.length === 0) {
                    return { ...state, loading: false, error: 'No posts available' };
                }
                const { posts: categoryPosts, totalPosts: categoryTotalPosts } = action.payload;

                return { ...state, loading: false, posts: categoryPosts, totalPosts: categoryTotalPosts };
            } else {
                return { ...state, loading: false, error: 'No posts available for the specified filter' };
            }

        case 'FETCH_POST_SUCCESS':
            if (action.payload) {
                return { ...state, loading: false, singlePost: action.payload };
            } else {
                return { ...state, loading: false, error: "The Post You are looking for doesn't Exist" };
            }

        case 'CREATE_POST_SUCCESS':

            return { ...state, loading: false, posts: [...state.posts, action.payload], error: null };
        case 'UPDATE_POST_SUCCESS':
            const updatedPosts = state.posts.map(post =>
                post.id === action.payload.id ? { ...post, ...action.payload } : post
            );
            return { ...state, loading: false, posts: updatedPosts, error: null };
        case 'DELETE_POST_SUCCESS':
            const filteredPosts = state.posts.filter(post => post.id !== action.payload);
            return { ...state, loading: false, posts: filteredPosts, error: null };
        case 'FETCH_POSTS_FAILURE':
        case 'CREATE_POST_FAILURE':
        case 'UPDATE_POST_FAILURE':
        case 'DELETE_POST_FAILURE':
        case 'FETCH_POSTS_BY_FILTER_FAILURE':
            return { ...state, loading: false, error: 'Internal Server Error', errorStatus: 500 };
        default:
            return state;
    }
};

export default postReducer;
