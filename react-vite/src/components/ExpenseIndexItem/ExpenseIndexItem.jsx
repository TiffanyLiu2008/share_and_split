import './ExpenseIndexItem.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ExpenseIndexItem({expense}) {
  const {lender_id, description, amount, shared_among, bill_settled, created_at, each_person} = expense;
  const sessionUser = useSelector(state => state.session.user);
  const sessionUserId = sessionUser ? sessionUser.id : null;
  const isLender = sessionUserId === lender_id;
  const convertDate = (oldDate) => {
    const dateObject = new Date(oldDate);
    const month = dateObject.toLocaleString('en-us', { month: 'long' });
    const day = dateObject.getDate();
    const year = dateObject.getFullYear();
    return `${month} ${day}, ${year}`;
  };
  const date = convertDate(created_at);
  const formattedEachPerson = each_person.toFixed(2);

  return (
    <div className='eachExpense'>
      <Link className='linkToExpense' to={`/expenses/${expense.id}`}>
        <p className='expenseCreatedAt'>{date}</p>
        <p className='expenseDescription'>{description}</p>
        {!isLender && !bill_settled &&
          <p className='expenseBorrowed'>You borrowed ${formattedEachPerson}</p>
        }
        {isLender && !bill_settled &&
          <p className='expenseLent'>You paid ${amount} for {shared_among} people</p>
        }
        {bill_settled &&
          <p className='expenseSettled'>${formattedEachPerson} (settled)</p>
        }
      </Link>
    </div>
  );
}

export default ExpenseIndexItem;
