import './DeleteCommentModal.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { thunkDeleteComment } from '../../redux/comments';

function DeleteCommentModal({comment}) {
  const commentId = comment.id;
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const handleDelete = async (e) => {
    e.preventDefault();
    dispatch(thunkDeleteComment(commentId))
    .then(closeModal)
    .catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) {
        setErrors(data.errors);
      }
    });
  };

  return (
    <div>
      <p className='heading'>Delete this comment?</p>
      <button className='deleteCommentYes' onClick={handleDelete}>Yes please</button><br/>
      <button className='deleteCommentNo' onClick={closeModal}>Not yet</button>
    </div>
  );
}

export default DeleteCommentModal;
