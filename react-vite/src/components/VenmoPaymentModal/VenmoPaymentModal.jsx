import './VenmoPaymentModal.css';
import { useModal } from '../../context/Modal';

function VenmoPaymentModal() {
  const {closeModal} = useModal();

  return (
    <div className='venmoPaymentModal'>
        <p className='venmoPaymentHeading'>Choose a payment method</p>
        <button className='venmoPaymentYes'>
            <a className='venmoLink' href="https://venmo.com/" target="blank">Venmo</a>
        </button><br/>
        <button className='paypalPaymentYes'>
            <a className='paypalLink' href="https://www.paypal.com/" target="blank">PayPal</a>
        </button><br/>
        <button className='venmoPaymentNo' onClick={closeModal}>Not yet</button>
    </div>
  );
}

export default VenmoPaymentModal;
