import './CreateComment.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { thunkCreateComment, thunkGetExpenseComments } from '../../redux/comments';
import { thunkGetExpenseDetails } from '../../redux/expenses';

function CreateComment({expenseId}) {
  const dispatch = useDispatch();
  const [commentText, setCommentText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const {closeModal} = useModal();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const formData = new FormData();
    formData.append('comment', commentText);
    setIsLoading(true);
    try {
      await dispatch(thunkCreateComment(expenseId, formData));
      await dispatch(thunkGetExpenseComments(expenseId));
      await dispatch(thunkGetExpenseDetails(expenseId));
    } catch (error) {
      console.error('Creating comment error', error);
    } finally {
      closeModal();
      setIsLoading(false);
    }
  };

  return (
    <form className='createCommentModal' onSubmit={handleSubmit}>
      <p className='commentFormHeading'>Create a comment</p>
      <label>
        <textarea className='commentFormNormal' value={commentText} placeholder='Your comment' onChange={(e) => setCommentText(e.target.value)} required/><br/>
      </label>
      <button className='submitCommentButton' type='submit' disabled={commentText.length === 0}>Submit</button>
      <button className='cancelButton' onClick={closeModal}>Cancel</button>
    </form>
  );
}

export default CreateComment;
