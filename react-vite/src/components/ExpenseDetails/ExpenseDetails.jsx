import './ExpenseDetails.css';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetExpenseDetails } from '../../redux/expenses';
import { thunkGetExpensePayments } from '../../redux/payments';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import DeleteExpenseModal from '../DeleteExpenseModal';
import ExpensePaymentsIndex from '../ExpensePaymentsIndex';
import ExpenseCommentsIndex from '../ExpenseCommentsIndex';
import CreatePaymentModal from '../CreatePaymentModal';

function ExpenseDetails() {
  const dispatch = useDispatch();
  const {expenseId} = useParams();
  const sessionUser = useSelector(state => state.session.user);
  const sessionUserId = sessionUser ? sessionUser.id : null;
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(thunkGetExpenseDetails(expenseId));
      } catch (error) {
        console.error('Fetching expense details error', error);
      }
    };
    fetchData();
  }, [dispatch, expenseId]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(thunkGetExpensePayments(expenseId));
      } catch (error) {
        console.error('Fetching expense payments error', error);
      }
    };
    fetchData();
  }, [dispatch, expenseId]);
  const expense = useSelector(state => state.expenses[expenseId]);
  const payments = useSelector(state => state.payments[expenseId]);
  const isLoading = !expense || !payments;
  if (isLoading) return (<>Loading...</>);
  const {lender_id, description, category, amount, shared_among, bill_settled, created_at, lender_username} = expense;
  const isLender = sessionUserId === lender_id;
  const convertDate = (oldDate) => {
    const str = oldDate.split(' ');
    const month = str[2];
    const day = str[1];
    const year = str[3];
    return `${month} ${day}, ${year}`;
  };
  const date = convertDate(created_at);
  const needMorePayments = Object.values(payments).length !== shared_among - 1;

  return (
    <div>
      {isLender && !bill_settled &&
        <Link to={`/expenses/${expense.id}/edit`}><button className='updateExpenseButton'>Edit</button></Link>
      }
      {isLender && bill_settled &&
        <p>settled</p>
      }
      {isLender &&
        <OpenModalMenuItem itemText='Delete' modalComponent={<DeleteExpenseModal expense={expense}/>}/>
      }
      <p className='expenseDetailBillSettled'>{bill_settled}</p>
      <p className='expenseDetailCreatedAt'>{date}</p>
      <p className='expenseDetailDescription'>{description}</p>
      <p className='expenseDetailCategory'>{category}</p>
      <p className='expenseDetailInfo'>{lender_username} paid ${amount}</p>
      <p className='expenseDetailInfo'>Splitted by:</p>
      <li className='expenseLenderInfo'>{lender_username} ${amount/shared_among}</li>
      {isLender && needMorePayments &&
        <OpenModalMenuItem itemText='People involved' modalComponent={<CreatePaymentModal expense={expense}/>}/>
      }
      <ExpensePaymentsIndex className='eachPayment'/>
      <ExpenseCommentsIndex className='eachComment'/>
    </div>
  );
}

export default ExpenseDetails;
