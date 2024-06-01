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
import food_and_drink from '../../../../images/food_and_drink.png';
import home from '../../../../images/home.png';
import life from '../../../../images/life.png';
import transportation from '../../../../images/transportation.png';
import utilities from '../../../../images/utilities.png';
import uncategorized from '../../../../images/uncategorized.png';

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
  const {lender_id, description, category, amount, shared_among, bill_settled, expense_date, lender_username} = expense;
  const isLender = sessionUserId === lender_id;
  const convertDate = (oldDate) => {
    const dateObject = new Date(oldDate);
    const month = dateObject.toLocaleString('en-us', { month: 'long' });
    const day = dateObject.getDate();
    const year = dateObject.getFullYear();
    return `${month} ${day}, ${year}`;
  };
  const date = convertDate(expense_date);
  const formattedAmount = amount.toFixed(2);
  const formattedEachPerson = (amount/shared_among).toFixed(2);
  const needMorePayments = Object.values(payments).length !== shared_among - 1;
  const categoryPic = (category) => {
    switch (category) {
      case 'Entertainment':
        return entertainment;
      case 'Food and drink':
        return food_and_drink;
      case 'Home':
        return home;
      case 'Life':
        return life;
      case 'Transportation':
        return transportation;
      case 'Utilities':
        return utilities;
      default:
        return uncategorized;
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
        <p className='expenseDetailsExpenseDate'>{date}</p>
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
