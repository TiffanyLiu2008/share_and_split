import './ExpenseIndex.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllExpenses } from '../../redux/expenses';
import SideNavigation from '../Navigation/SideNavigation';
import ExpenseIndexItem from '../ExpenseIndexItem';
import expensesPic from '../../../../images/expenses.png';

function ExpenseIndex() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(thunkGetAllExpenses());
      } catch (error) {
        console.error('Fetching expenses error', error);
      }
    };
    fetchData();
  }, [dispatch]);
  const expenses = useSelector(state => state.expenses.expenses);
  const noExpense = Array.isArray(expenses) && expenses.length === 0;
  const isLoading = !expenses;
  if (isLoading) return (<>Loading...</>);

  return (
    <div className='expenseIndex'>
      <SideNavigation/>
      <ul className='mainContent'>
        {noExpense &&
          <div>
            <p className='noExpense'>You have not added any expenses yet.</p>
            <p className='noExpense'>To add a new expense, click the blue "Add an expense" button.</p>
            <img className='expenseIndexImage' src={expensesPic} alt='expenseIndexPic'/>
          </div>
        }
        {expenses.map((expense) => (
          <li>
            <ExpenseIndexItem expense={expense} key={expense.Id}/>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseIndex;
