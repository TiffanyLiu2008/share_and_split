import './UpdateComment.css';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { thunkUpdateComment, thunkGetExpenseComments } from '../../redux/comments';
import { thunkGetExpenseDetails } from '../../redux/expenses';

function UpdateComment({eachComment}) {
  const dispatch = useDispatch();
  const {expenseId} = useParams();
  const [commentText, setCommentText] = useState(eachComment?.comment);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const {closeModal} = useModal();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const formData = new FormData();
    formData.append('id', eachComment.id);
    formData.append('comment', commentText);
    setIsLoading(true);
    try {
      await dispatch(thunkUpdateComment(formData));
      await dispatch(thunkGetExpenseComments(expenseId));
      await dispatch(thunkGetExpenseDetails(expenseId));
    } catch (error) {
      console.error('Updating comment error', error);
    } finally {
      closeModal();
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <p className='commentFormHeading'>Any comments?</p>
      <label className='commentFormNormal'>
        <textarea className='commentFormNormal' value={commentText} placeholder='Any thoughts?' onChange={(e) => setCommentText(e.target.value)} required/>
      </label>
      <button className='submitCommentButton' type='submit' disabled={commentText.length === 0}>Submit</button>
    </form>
  );
}

export default UpdateComment;
