import './ExpenseIndexItem.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function ExpenseIndexItem({expense}) {
  const {lender_id, description, bill_settled, created_at, each_person} = expense;
  const sessionUser = useSelector(state => state.session.user);
  const sessionUserId = sessionUser ? sessionUser.id : null;
  const isLender = sessionUserId === lender_id;

  return (
    <div>
      <Link to={`/expenses/${expense.id}`}></Link>
      <p className='expenseBillSettled'>{bill_settled}</p>
      <p className='expenseCreatedAt'>{created_at}</p>
      <p className='expenseDescription'>{description}</p>
      {!isLender && !bill_settled &&
        <p className='expenseInfo'>You borrowed {each_person}</p>
      }
      {isLender && !bill_settled &&
        <p className='expenseInfo'>You lent {each_person}</p>
      }
      {bill_settled &&
        <p className='expenseInfo'>{each_person}</p>
      }
    </div>
  );
}

export default ExpenseIndexItem;
