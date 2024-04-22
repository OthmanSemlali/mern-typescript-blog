import { useState } from 'react';
import { SubmitHandler, useForm, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCommentContext } from '../Context/CommentContext';


const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email(),
  content: z.string().min(10)
});
const AddComment = ({ postID, commentID }: { postID: string | null, commentID: string | null }) => {

  const { state } = useCommentContext()
  const { addComment, addReply } = useCommentContext()
  console.log();

  // type onSubmitProps = {name:string,email:string,content:string}
  type FormData = {
    name: string;
    email: string;
    content: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {

    // const {user} = {name,email}
    const { name, email, content } = data
    if (commentID) {
      addReply(commentID, { name, email }, content)
    }
    if (postID) {
      addComment({ name, email }, content, postID);

    }
  };
  return (
    <form className="p-10 mt-4 mb-5 bg-slate-200" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        {...register("name")}
        placeholder="Your Name"
        className="w-full p-2 mb-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
      />
      {errors.name && <p className='text-red-500'>{errors.name.message}</p>}


      <input
        type="email"
        {...register("email")}
        // value={email}
        placeholder="Your Email"
        className="w-full p-2 mb-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
      />
      {errors.email && <p className='text-red-500'>{errors.email.message}</p>}


      <textarea
        // value={comment}
        {...register("content")}
        placeholder="Write your comment..."
        className="w-full h-24 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
      ></textarea>
      {errors.content && <p className='text-red-500'>{errors.content.message}</p>}

      <button type="submit" className="px-4 py-2 mt-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
        {state.add_comment_is_loading || state.add_reply_is_loading ? 'wait..' : 'Add Comment'}
      </button>
    </form>
  );
};

export default AddComment;
