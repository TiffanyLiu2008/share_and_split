import './SettlePaymentModal.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { thunkUpdatePayment, thunkGetAllPayments } from '../../redux/payments';

function SettlePaymentModal({payment}) {
  const dispatch = useDispatch();
  const [paymentMade, setPaymentMade] = useState(payment?.payment_made);
  const {closeModal} = useModal();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('id', payment.id);
    formData.append('borrower_username', payment.borrower_username);
    formData.append('payment_made', true);
    try {
      await dispatch(thunkUpdatePayment(formData));
      await dispatch(thunkGetAllPayments());
    } catch (error) {
      console.error('Settling payment error', error);
    } finally {
      closeModal();
    }
  };

  return (
    <div>
      <p className='settlePaymentHeading'>Settle payment?</p>
      <button className='settlePaymentYes' onClick={handleSubmit}>Yes please</button><br/>
      <button className='settlePaymentNo' onClick={closeModal}>Not yet</button>
    </div>
  );
}

export default SettlePaymentModal;
