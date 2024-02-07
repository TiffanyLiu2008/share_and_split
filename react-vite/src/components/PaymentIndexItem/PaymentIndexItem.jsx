import './PaymentIndexItem.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import SettlePaymentModal from '../SettlePaymentModal';

function PaymentIndexItem({payment}) {
  const {payment_made, created_at, borrower_id, borrower_username, lender_username, each_person} = payment;
  const sessionUser = useSelector(state => state.session.user);
  const sessionUserId = sessionUser ? sessionUser.id : null;
  const isBorrower = sessionUserId === borrower_id;

  return (
    <div>
      <p className='paymentPaymentMade'>{payment_made}</p>
      <p className='paymentCreatedAt'>{created_at}</p>
      {isBorrower && !payment_made &&
        <div>
          <p className='paymentInfo'>You owe {lender_username} {each_person}</p>
          <OpenModalMenuItem itemText='Settle' modalComponent={<SettlePaymentModal payment={payment}/>}/>
        </div>
      }
      {!isBorrower && !payment_made &&
        <div>
          <p className='paymentInfo'>{borrower_username} owes you {each_person}</p>
          <OpenModalMenuItem itemText='Settle' modalComponent={<SettlePaymentModal payment={payment}/>}/>
        </div>
      }
      {isBorrower && payment_made &&
        <p className='paymentInfo'>Made {each_person} to {lender_username}</p>
      }
      {!isBorrower && payment_made &&
        <p className='paymentInfo'>Received {each_person} from {borrower_username}</p>
      }
    </div>
  );
}

export default PaymentIndexItem;
