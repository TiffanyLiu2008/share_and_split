import './DeleteCommentModal.css';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { thunkDeleteComment } from '../../redux/comments';

function DeleteCommentModal({eachComment}) {
  const expenseId = eachComment.expense_id;
  const commentId = eachComment.id;
  const dispatch = useDispatch();
  const {closeModal} = useModal();
  const handleDelete = async (e) => {
    e.preventDefault();
    dispatch(thunkDeleteComment(expenseId, commentId))
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
      <p className='deleteCommentHeading'>Delete this comment?</p>
      <button className='deleteCommentYes' onClick={handleDelete}>Yes please</button><br/>
      <button className='deleteCommentNo' onClick={closeModal}>Not yet</button>
    </div>
  );
}

export default DeleteCommentModal;
