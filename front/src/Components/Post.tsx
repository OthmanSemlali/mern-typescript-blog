import { useEffect } from "react";
// import { formatDateString } from "../lib/helpers"
import { Post } from "../lib/types"
import img from '../assets/img/typography.png'
import no_img from "../assets/img/no-image.svg"
import { Link } from "react-router-dom";
import { formatDate } from "../lib/helpers";
import Image from "./Image";

function Postt({ post }: {
    post: Post
}) {




    // Define a function to construct the link to a single post
    const getSinglePostLink = (title: string) => {
        const encodedTitle = encodeURIComponent(title.replace(/\s+/g, "-"));

        return `/post/${encodedTitle}`;
    };
    return (
        <div className="self-stretch w-full p-2 mb-2 sm:w-1/2 md:w-1/3">
            <div className="h-full rounded shadow-md">

                <Link to={getSinglePostLink(post.title)}>

                    <Image src={post.image} alt={post.title} height="500" width="960" className="w-full max-w-2xl mx-auto" />
                 
                </Link>

                <div className="px-6 py-5">
                    <div className="mb-2 text-lg font-semibold">
                        <Link className="text-slate-900 hover:text-slate-700" to={getSinglePostLink(post.title)}>{post.title}  </Link>
                    </div>
                    <p className="mb-1 text-sm text-slate-500" title="Published date">{post.userID.username} | {formatDate(post.createdAt)} | {post.readTime} min read</p>
                    <p className="text-slate-800">

                        {post.seoContent}

                    </p>
                    <div className="mt-4">
                        {post.tags.map(tag => (
                            <span key={tag} className="inline-block px-1 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 rounded-full hover:text-slate-500"><Link to={`/tag/${tag}`}>#{tag}</Link></span>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Postt