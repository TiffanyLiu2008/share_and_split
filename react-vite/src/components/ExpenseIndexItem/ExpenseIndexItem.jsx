import './ExpenseIndexItem.css';
import { Link } from 'react-router-dom';

function ExpenseIndexItem({expense}) {
  const {lender_id, description, amount, shared_among, bill_settled, created_at, each_person} = expense;
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
        <p className='expenseAmount'>${formattedEachPerson}</p>
      </Link>
    </div>
  );
}

export default ExpenseIndexItem;
