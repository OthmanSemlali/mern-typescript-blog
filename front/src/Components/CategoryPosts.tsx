import { Link, useNavigate, useParams } from "react-router-dom";
import { usePostContext } from "../Context/PostContext";
import { useEffect } from "react";
import LoadingSkeleton from "./LoadingSkeleton";
import no_img from "../assets/img/no-image.svg"
import { formatDateString, handleContentLength } from "../lib/helpers";



function CategoryPosts() {

    const navigate = useNavigate();

    const { categoryName } = useParams<{ categoryName: string | undefined }>();
    console.log('categoryName', categoryName)

    const { state, fetchPostsByCategory } = usePostContext();

    useEffect(() => {

        console.log('categoryName', categoryName)
        // Call the getPostById function when the component mounts
        if (categoryName) {
            fetchPostsByCategory(categoryName);

            console.log('state.', state.filteredPostsByCategory)
        }

        // navigate('/');

    }, [categoryName]); // Make sure to include getPostById and postId in the dependency array

    // Check if the post data is available in the state
    // if (state.loading) {
    //     // Render loading state or handle case when post data is not available
    //     return <LoadingPosts />;
    // }

    // console.log('single post ', state.singlePost)


    const getSinglePostLink = (postId: string) => {
        return `/post/${postId}`;
    };

    if (state.loading) {
        return <LoadingSkeleton />
    }

    if (!state.filteredPostsByCategory.length) {
        return "not matched category name"
    }
    return (<>
        <div className="mb-8 text-center">
            <h3 className="my-0 text-xl font-medium text-slate-700">Tagged with</h3>
            <h1 className="mt-0 text-4xl font-medium leading-normal">{categoryName}</h1>
        </div>
        <div className="flex flex-wrap -mx-2">

            {
                state.filteredPostsByCategory.map((fp) => {
                    return (

                        <div className="self-stretch w-full p-2 mb-2 sm:w-1/2 md:w-1/3">
                            <div className="h-full rounded shadow-md">
                                <Link to={getSinglePostLink(fp.id)}>
                                    <img className="w-full m-0 rounded-t lazy"
                                        src={fp.image || no_img}
                                        // data-src="/assets/img/small-business.jpg" width="960" height="500"
                                        alt={fp.title || 'alt'} />
                                </Link>
                                <div className="px-6 py-5">
                                    <div className="mb-2 text-lg font-semibold">
                                        <Link to={getSinglePostLink(fp.id)} className="text-slate-900 hover:text-slate-700" >
                                            {fp.title}
                                        </Link>
                                    </div>
                                    <p className="mb-1 text-slate-700" title="Published date">{formatDateString(fp.createdAt)}</p>
                                    <p className="text-slate-800">

                                       {handleContentLength(fp.content)}

                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                })
            }








        </div>
    </>
    )
}

export default CategoryPosts