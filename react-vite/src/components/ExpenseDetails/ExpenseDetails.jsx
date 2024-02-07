import './ExpenseDetails.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { thunkGetExpenseDetails } from '../../redux/expenses';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import DeleteExpenseModal from '../DeleteExpenseModal';
import ExpensePaymentsIndex from '../ExpensePaymentsIndex';
import ExpenseCommentsIndex from '../ExpenseCommentsIndex';

function ExpenseDetails() {
  const dispatch = useDispatch();
  const {expenseId} = useParams();
  const expense = useSelector(state => state.expenses[expenseId]);
  const payments = useSelector(state => state.payments[expenseId]);
  const comments = useSelector(state => state.comments[expenseId]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    dispatch(thunkGetExpenseDetails(expenseId)).then(() => setIsLoading(false));
  }, [dispatch, expenseId]);
  const {lender_id, description, category, amount, shared_among, bill_settled, created_at, lender_username} = expense;
  const sessionUser = useSelector(state => state.session.user);
  const sessionUserId = sessionUser ? sessionUser.id : null;
  const isLender = sessionUserId === lender_id;

  return (
    <div>
      <h1>Welcome</h1>
      {isLender &&
        <Link to={`/expenses/${expense.id}/edit`}><button className='updateExpenseButton'>Update</button></Link>
      }
      {isLender &&
        <OpenModalMenuItem itemText='Delete' modalComponent={<DeleteExpenseModal/>}/>
      }
      <p className='expenseDetailBillSettled'>{bill_settled}</p>
      <p className='expenseDetailCreatedAt'>{created_at}</p>
      <p className='expenseDetailDescription'>{description}</p>
      <p className='expenseDetailCategory'>{category}</p>
      <p className='expenseDetailInfo'>{lender_username} paid {amount}</p>
      <p className='expenseDetailInfo'>Splitted by:</p>
      <ExpensePaymentsIndex className='eachPayment'/>
      <ExpenseCommentsIndex className='eachComment'/>
    </div>
  );
}

export default ExpenseDetails;
