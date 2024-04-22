import { Link, redirect, useParams } from "react-router-dom";
import { usePostContext } from "../Context/PostContext";
import { Suspense, useEffect, useState } from "react";
import LoadingPosts from "./LoadingPosts";
import useDebouncedFunction, { formatDate, scrollToTop } from "../lib/helpers";
import no_img from "../assets/img/no-image.svg"
import ErrorPage from "./Error";
import ScrollToTop from "./ScrollToTop";
import Image from "./Image";
import AddComment from "./AddComment";
import CommentList from "./CommentList";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useCommentContext } from "../Context/CommentContext";
// import ReactMarkdown from 'react-markdown';
import ReactMarkdown from 'react-markdown';

// import Markdown from 'markdown-to-jsx';

import Markdown from 'react-markdown'

const markdown = '# Hi, *Pluto*!'
function SinglePost() {


    const { title } = useParams<{ title: string | undefined }>();
    const { fetchSinglePost, state } = usePostContext(); // Assuming you have a function named getPostById in your context



    useEffect(() => {

        // console.log('useeffect');

        // Call the getPostById function when the component mounts
        if (title) {
            const decodedTitle = decodeURIComponent(title.replace(/-/g, " "));
            // console.log('decodedTitle', decodedTitle)
            fetchSinglePost(decodedTitle);
            // console.log('singke post ',state.singlePost);

            //             fetchComments(state.singlePost?.id || null)
        }



    }, [title]);
    const [loadingComponent, setLoadingComponent] = useState(false);

    const debouncedSetLoadingComponent = useDebouncedFunction(setLoadingComponent, 700);

    useEffect(() => {
        if (state.loading) {
            setLoadingComponent(true);
        } else {
            debouncedSetLoadingComponent(false);
        }

        scrollToTop()
    }, [state.loading, debouncedSetLoadingComponent]);


    if (loadingComponent) {
        return <LoadingPosts />;
    }

    // if (state.loading) {
    //     return <LoadingPosts />;
    // }


    if (state.error || !state.singlePost) {
        return <ErrorPage status={state.errorStatus} type={"The Post You are looking for doesn't Exist"} />
    }


    return (
        <article className="max-w-5xl mx-auto">
            {/* <h1>h</h1> */}
            <Markdown>{'# Hi, *Pluto*!'}</Markdown>

            <header className="mb-14">
                <h1 className="mt-0 mb-3 text-3xl font-bold leading-normal text-center text-slate-900">{state.singlePost.title}</h1>
                <div className="text-center">
                    <p className="mb-1 text-sm text-slate-500" title="Published date">{state.singlePost.userID.username} | {formatDate(state.singlePost.createdAt)} | {state.singlePost.readTime} read</p>
                </div>

                <div className="mt-3 text-center">

                    <Link to={`/category/${state.singlePost.categoryID?.name}`}
                        className="inline-block bg-slate-200 rounded-full px-3 py-1 text-sm font-medium text-slate-700 m-0.5">
                        {state.singlePost.categoryID?.name}
                    </Link>

                    {/* <a href="/tags/business"
                        className="inline-block bg-slate-200 rounded-full px-3 py-1 text-sm font-medium text-slate-700 m-0.5">#business</a> */}

                </div>


                <div className="mt-10 -mx-7 md:mx-0">

                    {/* <LazyLoadImage
                        className="w-full max-w-2xl mx-auto"
                        // src="data:image/svg+xml,%3Csvg%20xmlns%3D&#39;http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg&#39;%20viewBox%3D&#39;0%200%201%201&#39;%20height%3D&#39;500&#39;%20width%3D&#39;960&#39;%20style%3D&#39;background-color%3Argb(203%2C213%2C224)&#39;%2F%3E"
                        src={state.singlePost.image || no_img} width={"960"} height={"500"}
                        effect="blur"
                        alt={state.singlePost.title} /> */}

                    <img className="w-full max-w-2xl mx-auto" data-src="data:image/svg+xml,%3Csvg%20xmlns%3D&#39;http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg&#39;%20viewBox%3D&#39;0%200%201%201&#39;%20height%3D&#39;500&#39;%20width%3D&#39;960&#39;%20style%3D&#39;background-color%3Argb(203%2C213%2C224)&#39;%2F%3E" src={state.singlePost.image || no_img} width="960" height="500"
                        alt="This post thumbnail" />

                    {/* <Image src={state.singlePost.image || no_img} width={"960"} height={"500"} alt={state.singlePost.title} className="w-full mx-auto"/> */}

                    {/* <Image src={state.singlePost.image} alt={state.singlePost.title} height="500" width="960" className="max-w-2xl mx-auto ww-full" /> */}

                </div>

            </header>
            <h1>hh</h1>
            {/* <div dangerouslySetInnerHTML={{ __html: state.singlePost.sanitizedHtml }} /> */}

            <div id="content" className="prose max-w-none reset" >

            <Markdown>{state.singlePost.content}</Markdown>
          
            </div>


            <ScrollToTop readTime={state.singlePost.readTime} />


            <div className="max-w-2xl mx-auto">
                <AddComment postID={state.singlePost.id} commentID={null} />

                <CommentList postID={state.singlePost.id} />
            </div>



        </article>
    )
}

export default SinglePost