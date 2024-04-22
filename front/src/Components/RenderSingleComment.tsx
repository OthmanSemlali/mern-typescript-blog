import { useState } from "react";
import { Comment, reply } from "../lib/types";
import AddComment from "./AddComment";
import { useCommentContext } from "../Context/CommentContext";
import { formatDate } from "../lib/helpers";


const renderReply = (reply: reply, i: number) => {
    return (
        <div key={i} className="p-4 mb-4 overflow-auto border rounded-md">
            <div className="flex items-center mb-2">
                <div className="font-semibold">{reply.user.name}</div>
                {/* <div className="ml-2 text-gray-500">{reply.user.email}</div> */}
            </div>
            <div>{reply.content}</div>
        </div>
    )
}

const RenderSingleComment = ({ comment }: { comment: Comment }) => {
    // const {state} = useCommentContext()

    const [showReply, setShowReply] = useState(false)

    const toggleReply = () => {
        setShowReply(prevState => !prevState);
    };
    return (


        <>
            <div key={comment.id} className="p-4 mb-4 overflow-auto border rounded-md">
                <div className="flex items-center mb-2">
                    <div className="font-semibold">{comment.user.name}</div>
                    <div className="ml-2 text-gray-500">{formatDate(comment.createdAt)}</div>
                </div>
                <div>{comment.content}</div>

                <span className="text-blue-600" onClick={toggleReply}>{showReply ? 'cancel reply' : 'reply'}</span>
                {
                    showReply ? <AddComment postID={null} commentID={comment.id} /> : null
                }
                {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-2 ml-4">
                        {comment.replies.map((reply: reply, i) => renderReply(reply, i))}
                    </div>
                )}
            </div>


        </>
    );
};

export default RenderSingleComment