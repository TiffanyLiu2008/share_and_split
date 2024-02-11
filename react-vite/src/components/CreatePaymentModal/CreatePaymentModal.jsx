import './CreatePaymentModal.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { thunkCreatePayment, thunkGetExpensePayments } from '../../redux/payments';
import { thunkGetExpenseDetails } from '../../redux/expenses';

function CreatePaymentModal(expense) {
  const expenseId = expense.expense.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [borrower_username, setBorrowerUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const {closeModal} = useModal();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const formData = new FormData();
    formData.append('borrower_username', borrower_username);
    setIsLoading(true);
    try {
      await dispatch(thunkCreatePayment(expenseId, formData));
      await dispatch(thunkGetExpensePayments(expenseId));
      await dispatch(thunkGetExpenseDetails(expenseId));
    } catch (error) {
      console.error('Creating payment error', error);
      setErrors({ backendError: 'Username is invalid' });
    } finally {
      closeModal();
      navigate(`/expenses/${expenseId}`);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <p className='createPaymentHeading'>People involved</p>
      <div className='errors'>
        <ul>{errors.backendError}</ul>
      </div>
      <label className='createPaymentNormal'>
        <input className='createPaymentNormal' type='text' value={borrower_username} placeholder='Username of your friend' onChange={(e) => setBorrowerUsername(e.target.value)} required/>
      </label>
      <button className='submitPaymentButton' type='submit'>Submit</button>
    </form>
  );
}

export default CreatePaymentModal;
