import React, { useEffect, useState } from 'react';
import { useCommentContext } from '../Context/CommentContext';
import { Comment, reply } from '../lib/types';
import ErrorPage from './Error';
import RenderSingleComment from './RenderSingleComment';

const CommentList = ({ postID }: { postID: string }) => {

  const { state, fetchComments } = useCommentContext()


  useEffect(() => {
    fetchComments(postID)
    console.log('postID from commentList', postID)
  }, [])

 
  console.log('satte.comments', state.comments)
  

  return (
    <div>
            {/* <h6>Comments</h6> */}

      {state.comments.map((comment) => <RenderSingleComment comment={comment} />)}
    </div>
  );
};

export default CommentList;
