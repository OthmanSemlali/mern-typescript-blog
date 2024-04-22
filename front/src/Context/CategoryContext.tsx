import { createContext, useContext, useEffect, useReducer } from "react";
import { CategoryState } from "../lib/types";
import categoryReducer from "../Reducer/CategoryReducer";



const initialState: CategoryState = {
    categoriesWithCounts: [],
    loading: false,
    error: null
}
type CategoryContext = {
    state: CategoryState,
    fetchCategories: () => void

}
export const CategoryContext = createContext<CategoryContext | null>(null);

type CategoryContextProviderProps = {
    children: React.ReactNode
}

const API_URL = "http://localhost:8001"
export default function CategoryContextProvider({ children }: CategoryContextProviderProps) {

    const [state, dispatch] = useReducer(categoryReducer, initialState)



    const fetchCategories = async () => {

        // console.log('fetchcatbegin**********')
        dispatch({ type: 'FETCH_CATEGORIES_REQUEST' });

        try {
            const response = await fetch(`${API_URL}/posts/getCategoriesWithPostCounts`);
            if (!response.ok) {
                // console.log('response.status', response.status)
                throw new Error('Failed to fetch categories');
            }
            const data = await response.json();

            console.log(' categories ', data);
            dispatch({ type: 'FETCH_CATEGORIES_SUCCESS', payload: data });

            // console.log('payloda ', data)
        } catch (error) {
            if (error instanceof Error) {
                dispatch({ type: 'FETCH_CATEGORIES_FAILURE', payload: error.message });
            } else {
                // Handle other types of errors
                dispatch({ type: 'FETCH_CATEGORIES_FAILURE', payload: 'An unknown error occurred' });
            }
        }
    };

    useEffect(() => {
        fetchCategories()
    }, [])
    return (
        <CategoryContext.Provider
            value={{
                state,
                fetchCategories
            }}
        >
            {children}
        </CategoryContext.Provider>
    )
}

export function useCategoryContext() {
    const context = useContext(CategoryContext);
    if (!context) {
        throw new Error('useCategoryContext must be used within a CategoryContextProvider');
    }

    return context;
} 