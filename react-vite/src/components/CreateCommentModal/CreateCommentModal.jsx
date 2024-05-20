import './CreateCommentModal.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { thunkCreateComment, thunkGetExpenseComments } from '../../redux/comments';
import { thunkGetExpenseDetails } from '../../redux/expenses';

function CreateCommentModal({expenseId}) {
  const dispatch = useDispatch();
  const [commentText, setCommentText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const {closeModal} = useModal();
  const validateForm = () => {
    const newErrors = {};
    if (!commentText) {
      newErrors.commentText = 'Comment is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const isFormValid = validateForm();
    if (isFormValid) {
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
    }
  };
  const commentTextError = errors.commentText ? `${errors.commentText}` : null;

  return (
    <form className='createCommentModal' onSubmit={handleSubmit}>
      <p className='commentFormHeading'>Add a comment</p>
      <div className='errors'>
        <ul>{commentTextError}</ul>
      </div>
      <label>
        <textarea className='commentFormNormal' value={commentText} placeholder='Add a comment' onChange={(e) => setCommentText(e.target.value)} required/><br/>
      </label>
      <button className='submitCommentButton' type='submit'>Post</button>
      <button className='cancelButton' onClick={closeModal}>Cancel</button>
    </form>
  );
}

export default CreateCommentModal;
