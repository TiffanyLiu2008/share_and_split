import './CreatePaymentModal.css';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { thunkCreatePayment, thunkGetExpensePayments } from '../../redux/payments';
import { thunkGetExpenseDetails } from '../../redux/expenses';

function CreatePaymentModal(expenseId) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [borrowerUsername, setBorrowerUsername] = useState('');
  const [paymentMade, setPaymentMade] = useState(false);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    payment = {...payment, borrowerUsername, paymentMade};
    let newPayment;
    dispatch(thunkCreatePayment(expenseId, payment))
    .then((newPayment) => history.push(`/payments/${newPayment.id}`))
    .then(() => dispatch(thunkGetExpensePayments(expenseId)))
    .then(() => dispatch(thunkGetExpenseDetails(expenseId)))
    .then(closeModal)
    .catch(async (response) => {
      const data = await response.json();
      if (data && data.errors) {
        setErrors(data.errors);
      }
    });
  };
  const borrowerUsernameError = errors.borrowerUsername ? `Username of your friend: ${errors.borrowerUsername}` : null;

  return (
    <form onSubmit={handleSubmit}>
      <p className='createPaymentHeading'>People involved</p>
      <div className='errors'>
        <ul>{borrowerUsernameError}</ul>
      </div>
      <label className='createPaymentNormal'>
        <input className='createPaymentNormal' type='text' value={borrowerUsername} placeholder='Username of your friend?' onChange={(e) => setBorrowerUsername(e.target.value)} required/>
      </label>
      <label className='createPaymentNormal'>
        <input className='createPaymentNormal' type='text' value={paymentMade} placeholder='Payment made?' onChange={(e) => setPaymentMade(e.target.value)} required/>
      </label>
      <button className='submitPaymentButton' type='submit'>Submit</button>
    </form>
  );
}

export default CreatePaymentModal;
