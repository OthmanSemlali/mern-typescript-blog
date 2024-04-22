// PostContext.tsx
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import postReducer from '../Reducer/PostReducer';
import { Post, PostAction, type PostState } from '../lib/types';



const initialState: PostState = {
    posts: [],
    totalPosts: 0,
    singlePost: null,
    loading: false,
    error: null,
    errorStatus: null
};

type PostContextValue = {
    state: PostState;
    // dispatch: React.Dispatch<PostAction>;
    fetchPaginatedPosts: (page: number, pageSize: number) => Promise<void>;
    createPost: (newPost: Post) => Promise<void>;
    deletePost: (postId: string) => Promise<void>;
    updatePost: (postId: string, updatedPost: Post) => Promise<void>;
    // fetchPostById: (postId: string) => void;
    fetchPostsByCategory: (categoryName: string, page: number, pageSize: number) => Promise<void>;
    fetchPostsByTag: (tagName: string, page: number, pageSize: number) => Promise<void>;
    fetchSinglePost: (title: string) => Promise<void>;
};

const PostContext = createContext<PostContextValue | undefined>(undefined);



type PostContextProviderProps = {
    children: React.ReactNode
}

const API_URL = "http://localhost:8001/posts"
export const PostContextProvider = ({ children }: PostContextProviderProps) => {
    const [state, dispatch] = useReducer(postReducer, initialState);

    const fetchPaginatedPosts = async (page: number, pageSize: number) => {
        dispatch({ type: 'FETCH_POSTS_REQUEST' });
        try {
            const response = await fetch(`${API_URL}/fetchPaginatedPosts/${page}/${pageSize}`);
            if (!response.ok) {
                // throw new Error('Failed to fetch posts');
                return dispatch({ type: 'FETCH_POSTS_FAILURE' });
            }
            const data = await response.json();
            dispatch({ type: 'FETCH_POSTS_SUCCESS', payload: data });

        } catch (error) {
            return dispatch({ type: 'FETCH_POSTS_FAILURE' });
        }
    };



    const fetchSinglePost = async (title: string) => {
        dispatch({ type: 'FETCH_POST_REQUEST' });

        try {
            const response = await fetch(`${API_URL}/fetchSinglePostByTitle/${title}`);
            if (!response.ok) {
                // throw new Error('Failed to fetch posts');
                return dispatch({ type: 'FETCH_POST_FAILURE' })
            }
            const data = await response.json();

            // console.log('single post ', data);
            dispatch({ type: 'FETCH_POST_SUCCESS', payload: data });
        } catch (error) {
            dispatch({ type: 'FETCH_POST_FAILURE' })
        }
    };
    // const fetchPostById = (postId: string) => {
    //     const singlePost =
    //     {
    //         "id":"d",
    //         "title": "Post Title",
    //         "content": "Lid est laborum et dolorum fuga. Et harum quidem rerum facilis est et expeditasi distincti.",
    //         "image": "https://vredeburg.netlify.app/assets/img/typography.png",
    //         "userID": "dd",
    //         "categoryID": {"id":"d","name":"romance"},
    //         "createdAt": "2024-03-31T23:36:25.109Z",
    //     }
    //     dispatch({ type: 'FETCH_POST_REQUEST' });
    //     dispatch({ type: 'FETCH_POST_SUCCESS', payload:singlePost });
    // }

    const createPost = async (post: Post) => {
        dispatch({ type: 'CREATE_POST_REQUEST' });
        try {
            const response = await fetch(`${API_URL}/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(post),
            });
            if (!response.ok) {
                // throw new Error('Failed to create post');
                return dispatch({ type: 'CREATE_POST_FAILURE' })
            }
            const data = await response.json();
            dispatch({ type: 'CREATE_POST_SUCCESS', payload: data });
        } catch (error) {
            dispatch({ type: 'CREATE_POST_FAILURE' })
        }
    };

    const updatePost = async (postId: string, updatedPost: Post) => {
        dispatch({ type: 'UPDATE_POST_REQUEST' });
        try {
            const response = await fetch(`${API_URL}/posts/${postId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedPost),
            });
            if (!response.ok) {
                return dispatch({ type: 'UPDATE_POST_FAILURE' })

            }
            const data = await response.json();
            dispatch({ type: 'UPDATE_POST_SUCCESS', payload: data });
        } catch (error) {
            dispatch({ type: 'UPDATE_POST_FAILURE' })
        }
    };

    const deletePost = async (postId: string) => {
        dispatch({ type: 'DELETE_POST_REQUEST' });
        try {
            const response = await fetch(`${API_URL}/posts/${postId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                return dispatch({ type: 'DELETE_POST_FAILURE' })
            }
            dispatch({ type: 'DELETE_POST_SUCCESS', payload: postId });
        } catch (error) {
            // console.error(error.message);

            dispatch({ type: 'DELETE_POST_FAILURE' })

        }
    };

    const fetchPostsByCategory = async (categoryName: string, page: number, pageSize: number) => {
        dispatch({ type: 'FETCH_POSTS_BY_FILTER_REQUEST' });

        try {
            const response = await fetch(`${API_URL}/fetchPaginatedPostsByCategory/${categoryName}/${page}/${pageSize}`);
            if (!response.ok) {
                // throw new Error('Failed to  fetchPostsByCategory');
                return dispatch({ type: "FETCH_POSTS_BY_FILTER_FAILURE" })
            }

            const posts = await response.json()

            // console.log('posts by cat', posts)
            dispatch({ type: 'FETCH_POSTS_BY_FILTER_SUCCESS', payload: posts });
        } catch (error) {
            dispatch({ type: "FETCH_POSTS_BY_FILTER_FAILURE" })

        }
    }

    const fetchPostsByTag = async (tagName: string, page: number, pageSize: number) => {
        dispatch({ type: 'FETCH_POSTS_BY_FILTER_REQUEST' });

        try {
            const response = await fetch(`${API_URL}/fetchPaginatedPostsByTag/${tagName}/${page}/${pageSize}`);
            if (!response.ok) {
                // throw new Error('Failed to  fetchPostsByTag');
                return dispatch({ type: "FETCH_POSTS_BY_FILTER_FAILURE" })

            }

            const posts = await response.json()

            dispatch({ type: 'FETCH_POSTS_BY_FILTER_SUCCESS', payload: posts });
        } catch (error) {
            dispatch({ type: "FETCH_POSTS_BY_FILTER_FAILURE" })

        }
    }

    const contextValue: PostContextValue = {
        state,
        // dispatch,
        fetchPaginatedPosts,
        createPost,
        deletePost,
        updatePost,
        fetchPostsByTag,
        // fetchPostById,
        fetchPostsByCategory,
        fetchSinglePost
    };
    return <PostContext.Provider value={contextValue}>{children}</PostContext.Provider>;
};


export const usePostContext = () => {
    const context = useContext(PostContext);
    if (!context) {
        throw new Error('usePostContext must be used within a PostContextProvider');
    }
    return context;
};