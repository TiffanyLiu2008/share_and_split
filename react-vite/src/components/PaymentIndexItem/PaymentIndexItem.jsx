import './PaymentIndexItem.css';
import { useSelector } from 'react-redux';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import SettlePaymentModal from '../SettlePaymentModal';

function PaymentIndexItem({payment}) {
  const {payment_made, updated_at, borrower_id, borrower_username, lender_username, each_person} = payment;
  const sessionUser = useSelector(state => state.session.user);
  const sessionUserId = sessionUser ? sessionUser.id : null;
  const isBorrower = sessionUserId === borrower_id;
  const convertDate = (oldDate) => {
    const dateObject = new Date(oldDate);
    const month = dateObject.toLocaleString('en-us', { month: 'long' });
    const day = dateObject.getDate();
    const year = dateObject.getFullYear();
    return `${month} ${day}, ${year}`;
  };
  const date = convertDate(updated_at);
  const formattedEachPerson = each_person.toFixed(2);

  return (
    <div className='eachPayment'>
      {isBorrower && !payment_made &&
        <div>
          <p className='paymentCreatedAt'>{date}</p>
          <p className='paymentBorrowed'>You owe {lender_username} ${formattedEachPerson}</p>
        </div>
      }
      {!isBorrower && !payment_made &&
        <div>
          <p className='paymentCreatedAt'>{date}</p>
          <p className='paymentLent'>{borrower_username} owes you ${formattedEachPerson}</p>
          <OpenModalMenuItem itemText='Settle' modalComponent={<SettlePaymentModal payment={payment}/>}/>
        </div>
      }
      {isBorrower && payment_made &&
        <div>
          <p className='paymentCreatedAt'>{date}</p>
          <p className='paymentSettled'>Made ${formattedEachPerson} to {lender_username} (settled)</p>
        </div>
      }
      {!isBorrower && payment_made &&
        <div>
          <p className='paymentCreatedAt'>{date}</p>
          <p className='paymentSettled'>Received ${formattedEachPerson} from {borrower_username} (settled)</p>
        </div>
      }
    </div>
  );
}

export default PaymentIndexItem;
