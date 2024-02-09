import './PaymentIndexItem.css';
import { useDispatch, useSelector } from 'react-redux';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import SettlePaymentModal from '../SettlePaymentModal';

function PaymentIndexItem({payment}) {
  const {payment_made, created_at, borrower_id, borrower_username, lender_username, each_person} = payment;
  const sessionUser = useSelector(state => state.session.user);
  const sessionUserId = sessionUser ? sessionUser.id : null;
  const isBorrower = sessionUserId === borrower_id;
  const convertDate = (oldDate) => {
    const str = oldDate.split(' ');
    const month = str[2];
    const day = str[1];
    const year = str[3];
    return `${month} ${day}, ${year}`;
  };
  const date = convertDate(created_at);

  return (
    <div>
      <p className='paymentPaymentMade'>{payment_made}</p>
      <p className='paymentCreatedAt'>{date}</p>
      {isBorrower && !payment_made &&
        <div>
          <p className='paymentInfo'>You owe {lender_username} ${each_person}</p>
          <OpenModalMenuItem itemText='settle' modalComponent={<SettlePaymentModal payment={payment}/>}/>
        </div>
      }
      {!isBorrower && !payment_made &&
        <div>
          <p className='paymentInfo'>{borrower_username} owes you ${each_person}</p>
          <OpenModalMenuItem itemText='settle' modalComponent={<SettlePaymentModal payment={payment}/>}/>
        </div>
      }
      {isBorrower && payment_made &&
        <p className='paymentInfo'>Made ${each_person} to {lender_username} settled</p>
      }
      {!isBorrower && payment_made &&
        <p className='paymentInfo'>Received ${each_person} from {borrower_username} settled</p>
      }
    </div>
  );
}

export default PaymentIndexItem;
