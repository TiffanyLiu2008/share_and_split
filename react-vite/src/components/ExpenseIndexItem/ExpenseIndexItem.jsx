import './ExpenseIndexItem.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function ExpenseIndexItem({expense}) {
  const {lender_id, description, bill_settled, created_at, each_person} = expense;
  const sessionUser = useSelector(state => state.session.user);
  const sessionUserId = sessionUser ? sessionUser.id : null;
  const isLender = sessionUserId === lender_id;
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
      <Link to={`/expenses/${expense.id}`}>
        <p className='expenseCreatedAt'>{date}</p>
        <p className='expenseDescription'>{description}</p>
        {!isLender && !bill_settled &&
          <p className='expenseInfo'>You borrowed {each_person}</p>
        }
        {isLender && !bill_settled &&
          <p className='expenseInfo'>You lent {each_person}</p>
        }
        {bill_settled &&
          <p className='expenseInfo'>{each_person} (settled)</p>
        }
      </Link>
    </div>
  );
}

export default ExpenseIndexItem;
