import './DeleteExpenseModal.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { thunkDeleteExpense } from '../../redux/expenses';

function DeleteExpenseModal({expense}) {
  const expenseId = expense.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {closeModal} = useModal();
  const handleDelete = async (e) => {
    e.preventDefault();
    dispatch(thunkDeleteExpense(expenseId))
    .then(closeModal)
    .then(navigate('/expenses'))
    .catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) {
        setErrors(data.errors);
      }
    });
  };

  return (
    <div>
      <p className='heading'>Delete this expense?</p>
      <button className='deleteExpenseYes' onClick={handleDelete}>Yes please</button><br/>
      <button className='deleteExpenseNo' onClick={closeModal}>Not yet</button>
    </div>
  );
}

export default DeleteExpenseModal;
