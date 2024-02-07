import CommentForm from '../CommentForm';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { thunkGetCommentDetails } from '../../redux/comments';

function UpdateComment() {
  const dispatch = useDispatch();
  const { commentId } = useParams;
  const comment = useSelector(state => state.comments[commentId]);
  useEffect(() => {
    dispatch(thunkGetCommentDetails(commentId));
  }, [dispatch, commentId]);
  if (!comment) return (<></>);

  return (
    Object.keys(comment).length > 1 && (
      <>
        <CommmentForm comment={comment} formType='Update Commment'/>
      </>
    )
  );
}

export default UpdateComment;
