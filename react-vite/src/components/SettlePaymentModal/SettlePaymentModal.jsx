import './SettlePaymentModal.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { thunkUpdatePayment, thunkGetAllPayments } from '../../redux/payments';

function SettlePaymentModal(expenseId) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [paymentMade, setPaymentMade] = useState(false);
  const { closeModal } = useModal();
  const handleSubmit = async (e) => {
    e.preventDefault();
    payment = {...payment, borrowerUsername, paymentMade};
    let newPayment;
    dispatch(thunkUpdatePayment(expenseId, payment))
    .then((newPayment) => navigate(`/payments/${newPayment.id}`))
    .then(() => dispatch(thunkGetAllPayments()))
    .then(closeModal)
    .catch(async (response) => {
      const data = await response.json();
      if (data && data.errors) {
        setErrors(data.errors);
      }
    });
  };

  return (
    <div>
      <p className='heading'>Settle payment?</p>
      <button className='settlePaymentYes' onClick={handleSubmit}>Yes please</button><br/>
      <button className='settlePaymentNo' onClick={closeModal}>Not yet</button>
    </div>
  );
}

export default SettlePaymentModal;
