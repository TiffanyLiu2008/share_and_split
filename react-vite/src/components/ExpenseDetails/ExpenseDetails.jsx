import './ExpenseDetails.css';
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetExpenseDetails } from '../../redux/expenses';
import { thunkGetExpensePayments } from '../../redux/payments';
import SideNavigation from '../Navigation/SideNavigation';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import DeleteExpenseModal from '../DeleteExpenseModal';
import ExpensePaymentsIndex from '../ExpensePaymentsIndex';
import ExpenseCommentsIndex from '../ExpenseCommentsIndex';
import CreatePaymentModal from '../CreatePaymentModal';
import entertainment from '../../../../images/entertainment.png';
import food from '../../../../images/food.png';
import housing from '../../../../images/housing.png';
import others from '../../../../images/others.png';
import transportation from '../../../../images/transportation.png';

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
    const dateObject = new Date(oldDate);
    const month = dateObject.toLocaleString('en-us', { month: 'long' });
    const day = dateObject.getDate();
    const year = dateObject.getFullYear();
    return `${month} ${day}, ${year}`;
  };
  const date = convertDate(created_at);
  const formattedAmount = amount.toFixed(2);
  const formattedEachPerson = (amount/shared_among).toFixed(2);
  const needMorePayments = Object.values(payments).length !== shared_among - 1;
  const categoryPic = (category) => {
    switch (category) {
      case 'Entertainment':
        return entertainment;
      case 'Food':
        return food;
      case 'Housing':
        return housing;
      case 'Transportation':
        return transportation;
      default:
        return others;
    }
  };

  return (
    <div className='expenseDetails'>
      <SideNavigation/>
      <div className='mainContentDetails'>
        {isLender && bill_settled &&
          <p className='expenseDetailsBillSettled'>SETTLED</p>
        }
        {isLender && !bill_settled &&
          <Link to={`/expenses/${expense.id}/edit`}><button className='updateExpenseButton'>Edit</button></Link>
        }
        {isLender &&
          <OpenModalMenuItem itemText='Delete' modalComponent={<DeleteExpenseModal expense={expense}/>}/>
        }
        <p className='expenseDetailsCreatedAt'>{date}</p>
        <p className='expenseDetailsDescription'>{description}</p>
        <img src={categoryPic(category)} alt='categoryPic'/>
        <p className='expenseDetailsLender'>{lender_username} paid ${formattedAmount}</p>
        <p className='expenseDetailsInfo'>Splitted by:</p>
        <li className='expenseDetailsInfo'>{lender_username} ${formattedEachPerson}</li>
        {isLender && needMorePayments &&
          <OpenModalMenuItem itemText='Shared with?' modalComponent={<CreatePaymentModal expense={expense}/>}/>
        }
        <ExpensePaymentsIndex/>
        <ExpenseCommentsIndex/>
      </div>
    </div>
  );
}

export default ExpenseDetails;
