import { useEffect, useState } from "react";
import PaginationControls from "./PaginationControls"
import Post from "./Post"
import { usePostContext } from "../Context/PostContext";
import { redirect, useLocation, useNavigate, useParams } from "react-router-dom";
import LoadingPosts from "./LoadingPosts";
import LoadingSkeleton from "./LoadingSkeleton";
import CategoryPosts from "./CategoryPosts";
import CategoriesList from "./CategoriesList";
import FilterHeader from "./FilterHeader";
import ErrorPage from "./Error";
import useDebouncedFunction, { scrollToTop } from "../lib/helpers";


function Posts() {

    const { fetchPaginatedPosts, fetchPostsByCategory, fetchPostsByTag, state } = usePostContext()
    const { page, categoryName, tagName } = useParams<{ page: string | undefined, categoryName: string | undefined, tagName: string | undefined }>();
    const { pathname } = useLocation();

    let firstPath = pathname.split('/')[1];


    const [route, setRoute] = useState(firstPath);
    useEffect(() => {
        if (categoryName) {
            setRoute(`${firstPath}/${categoryName}`);
        } else if (tagName) {
            setRoute(`${firstPath}/${tagName}`);
        } else {
            setRoute(firstPath);
        }
    }, [firstPath, categoryName, tagName]);

    const pageSize = 6;


    useEffect(() => {
        const pageNumber = parseInt(page || '1', 10) || 1;

        // console.log('pageNumber', pageNumber)
        if (pathname.startsWith('/category')) {
            if (categoryName) {
                fetchPostsByCategory(categoryName, pageNumber, pageSize)
                // alert('cat')
            }
        }
        else if (pathname.startsWith('/tag')) {
            if (tagName) {
                fetchPostsByTag(tagName, pageNumber, pageSize)
                // alert('cat')
            }
        }
        else if (pathname.startsWith('/blog')) {
            // Otherwise, fetch all posts
            fetchPaginatedPosts(pageNumber, pageSize);
            // alert('posts')
        }




        scrollToTop();
    }, [page, route]);

    const totalPages = Math.ceil(state.totalPosts / 6);
    // console.log('totalPages ', totalPages)
    // console.log('totalPages rouuuute ', route)



    const [loadingComponent, setLoadingComponent] = useState(false);

    const debouncedSetLoadingComponent = useDebouncedFunction(setLoadingComponent, 300);

    useEffect(() => {
        if (state.loading) {
            setLoadingComponent(true);
        } else {
            debouncedSetLoadingComponent(false);
        }

        scrollToTop()
    }, [state.loading, debouncedSetLoadingComponent]);

    // if (loadingComponent) {
    //     return <LoadingPosts />;
    // }


    // if (state.loading) {
    //    return  <LoadingPosts />
    // }
    if (state.error) {
        return <ErrorPage status={state.errorStatus} type={state.error} />
    }
    return (
        <>

            {
                tagName ? <FilterHeader title={'Taged With'} filterName={tagName} /> :   <CategoriesList selectedCategory={categoryName} /> 
                // <FilterHeader title={'Posts Under'} filterName={categoryName} /> 

            }

            {
                loadingComponent ? (
                    <LoadingPosts />
                ) : (

                    <>

                        <div className="flex flex-wrap -mx-2">

                            {
                                state.posts.map((post) => <Post key={post.id} post={post} />)
                            }

                        </div>

                        <div className="flow-root mt-3">
                            {state.posts.length > 0 ? <PaginationControls route={route} currentPage={parseInt(page || '1') || 1} totalPages={totalPages} /> : null}
                        </div>
                    </>

                )

            }
        </>


    )
}

export default Posts