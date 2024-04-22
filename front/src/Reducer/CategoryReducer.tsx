// PostReducer.tsx
// import { Action, PostState } from './PostContext';

import { CategoryAction, CategoryState } from "../lib/types";

// import { PostAction, PostState } from "../lib/types";

const categoryReducer = (state: CategoryState, action: CategoryAction): CategoryState => {
    switch (action.type) {
        case 'FETCH_CATEGORIES_REQUEST':
            //     case 'FETCH_POST_REQUEST':
            //     case 'CREATE_POST_REQUEST':
            //     case 'UPDATE_POST_REQUEST':
            //     case 'DELETE_POST_REQUEST':
            return { ...state, loading: true, error: null };
        case 'FETCH_CATEGORIES_SUCCESS':

            //         // const { posts, totalPosts } = action.payload;
            //         console.log('action.payload', action.payload)
            return { ...state, loading: false, categoriesWithCounts: action.payload, error: null };


        //     case 'FETCH_POST_FROM_LOCAL_STATE':
        //         const singlePost = state.posts.find((p) => p.id == action.payload);
        //         return { ...state, loading: false, singlePost: singlePost || null, error: null }
        //     case 'FETCH_POST_SUCCESS':
        //         return { ...state, loading: false, singlePost: action.payload, error: null };


        //     case 'CREATE_POST_SUCCESS':
        //         return { ...state, loading: false, posts: [...state.posts, action.payload], error: null };
        //     case 'UPDATE_POST_SUCCESS':
        //         const updatedPosts = state.posts.map(post =>
        //             post.id === action.payload.id ? { ...post, ...action.payload } : post
        //         );
        //         return { ...state, loading: false, posts: updatedPosts, error: null };
        //     case 'DELETE_POST_SUCCESS':
        //         const filteredPosts = state.posts.filter(post => post.id !== action.payload);
        //         return { ...state, loading: false, posts: filteredPosts, error: null };
        case 'FETCH_CATEGORIES_FAILURE':
            //     case 'CREATE_POST_FAILURE':
            //     case 'UPDATE_POST_FAILURE':
            //     case 'DELETE_POST_FAILURE':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default categoryReducer;
