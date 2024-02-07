import './CommentForm.css';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { thunkCreateComment, thunkUpdateComment, thunkGetExpenseComments } from '../../redux/comments';
import { thunkGetExpenseDetails } from '../../redux/expenses';

function CommentForm({expenseId, comment, formType}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [commentText, setCommentText] = useState(comment?.comment);
  const title = formType === 'Create Comment' ? 'Create a New Comment' : 'Update Your Comment';
  const { closeModal } = useModal();
  const handleSubmit = async (e) => {
    e.preventDefault();
    comment = {...comment, commentText};
    let newComment;
    if (formType === 'Update Comment') {
      dispatch(thunkUpdateComment(comment))
      .then((newComment) => history.push(`/comments/${newComment.id}`))
      .then(() => dispatch(thunkGetExpenseComments(expenseId)))
      .then(() => dispatch(thunkGetExpenseDetails(expenseId)))
      .then(closeModal)
      .catch(async (response) => {
        const data = await response.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      })
    } else if (formType === 'Create Comment') {
      dispatch(thunkCreateComment(expenseId, comment))
      .then((newComment) => history.push(`/comments/${newComment.id}`))
      .then(() => dispatch(thunkGetExpenseComments(expenseId)))
      .then(() => dispatch(thunkGetExpenseDetails(expenseId)))
      .then(closeModal)
      .catch(async (response) => {
        const data = await response.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      })
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <p className='commentFormHeading'>Any comments?</p>
      <label className='commentFormNormal'>
        <textarea className='commentFormNormal' value={commentText} placeholder='Any thoughts?' onChange={(e) => setCommentText(e.target.value)} required/>
      </label>
      <button className='submitCommentButton' type='submit' disabled={commentText.length=0}>Submit</button>
    </form>
  );
}

export default CommentForm;
