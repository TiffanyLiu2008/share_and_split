import './RecordPaymentModal.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { thunkUpdatePayment, thunkGetAllPayments } from '../../redux/payments';

function RecordPaymentModal({payment}) {
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
    <div className='recordPaymentModal'>
      <p className='recordPaymentHeading'>Received a cash payment?</p>
      <button className='recordPaymentYes' onClick={handleSubmit}>Yes record</button><br/>
      <button className='recordPaymentNo' onClick={closeModal}>Not yet</button>
    </div>
  );
}

export default RecordPaymentModal;
