import { createContext, useContext, useReducer } from "react";
import { Comment, CommentState, reply, userComment } from "../lib/types";
import commentReducer from "../Reducer/CommentReducer";
import _ from 'lodash';


const initialState: CommentState = {
    comments: [],
    loading: false,
    add_comment_is_loading: false,
    add_reply_is_loading: false,
    error: null,
    errorStatus: null
}
type CommentContext = {
    state: CommentState,
    fetchComments: (id: string | null) => Promise<void>
    addComment: (user: userComment, content: string, postID: string) => Promise<void>
    addReply: (parentCommentId: string, user: userComment, content: string) => Promise<void>
}
export const CommentContext = createContext<CommentContext | null>(null);

type CommentContextProviderProps = {
    children: React.ReactNode
}

const API_URL = "http://localhost:8001"
export default function CommentContextProvider({ children }: CommentContextProviderProps) {

    const [state, dispatch] = useReducer(commentReducer, initialState)



    const fetchComments = async (id: string | null) => {

        if (!id) {
            return;
        }
        console.log('id com ', JSON.stringify({ id: id }))
        dispatch({ type: 'FETCH_COMMENTS_REQUEST' });

        try {
            const response = await fetch(`${API_URL}/comments/fetchCommentsByPostId/${id.toString()}`);
            if (!response.ok) {
                // console.log('response.status', response.status)
                dispatch({ type: 'FETCH_COMMENTS_FAILURE' })
            }
            const data = await response.json();

            console.log(' comments ', data);
            dispatch({ type: 'FETCH_COMMENTS_SUCCESS', payload: data });

        } catch (error) {

            dispatch({ type: 'FETCH_COMMENTS_FAILURE' });

        }
    };


    const debouncedAddCommentDispatch = _.debounce((data: Comment) => {
        dispatch({ type: 'ADD_COMMENT_SUCCESS', payload: data });
      }, 500); // Debounce for 2 seconds
      const debouncedRplyCommentDispatch = _.debounce((data) => {
        dispatch({ type: 'ADD_REPLY_SUCCESS', payload: data });
      }, 500); // Debounce for 2 seconds
    const addComment = async (user: userComment, content: string, postID: string) => {
        dispatch({ type: 'ADD_COMMENT_REQUEST' });

        console.log('{ user, content, postID }', JSON.stringify({ user, content, postID }))
        try {
            const response = await fetch(`${API_URL}/comments/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user, content, postID }),
            });
            if (!response.ok) {
                dispatch({ type: 'ADD_COMMENT_FAILURE' })
            }
            const data = await response.json();

            debouncedAddCommentDispatch(data)
            // dispatch({ type: 'ADD_COMMENT_SUCCESS', payload: data });
        } catch (error) {
            dispatch({ type: 'ADD_COMMENT_FAILURE' })
        }
    };


    const addReply = async (parentCommentId: string, user: userComment, content: string) => {
        dispatch({ type: 'ADD_REPLY_REQUEST' });
        try {
            const response = await fetch(`${API_URL}/comments/addReply/${parentCommentId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user, content }),
            });
            if (!response.ok) {
                dispatch({ type: 'ADD_REPLY_FAILURE' })
            }
            const data = await response.json();
            // dispatch({ type: 'ADD_REPLY_SUCCESS', payload: data });
            debouncedRplyCommentDispatch(data)
        } catch (error) {
            dispatch({ type: 'ADD_REPLY_FAILURE' })
        }
    };
    // useEffect(() => {
    //     fetchCategories()
    // }, [])
    return (
        <CommentContext.Provider
            value={{
                state,
                fetchComments,
                addComment,
                addReply
            }}
        >
            {children}
        </CommentContext.Provider>
    )
}

export function useCommentContext() {
    const context = useContext(CommentContext);
    if (!context) {
        throw new Error('useCommentContext must be used within a CommentContextProvider');
    }

    return context;
} 