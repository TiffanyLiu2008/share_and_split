import './UpdateCommentModal.css';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { thunkUpdateComment, thunkGetExpenseComments } from '../../redux/comments';
import { thunkGetExpenseDetails } from '../../redux/expenses';

function UpdateCommentModal({eachComment}) {
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
    <form className='updateCommentModal' onSubmit={handleSubmit}>
      <p className='commentFormHeading'>Update my comment</p>
      <label>
        <textarea className='commentFormNormal' value={commentText} placeholder='Your comment' onChange={(e) => setCommentText(e.target.value)} required/><br/>
      </label>
      <button className='submitCommentButton' type='submit' disabled={commentText.length === 0}>Submit</button>
      <button className='cancelButton' onClick={closeModal}>Cancel</button>
    </form>
  );
}

export default UpdateCommentModal;
