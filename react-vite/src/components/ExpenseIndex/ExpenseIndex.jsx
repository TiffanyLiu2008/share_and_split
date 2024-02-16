import './ExpenseIndex.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllExpenses } from '../../redux/expenses';
import SideNavigation from '../Navigation/SideNavigation';
import ExpenseIndexItem from '../ExpenseIndexItem';

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
  const isLoading = !expenses;
  if (isLoading) return (<>Loading...</>);

  return (
    <div className='expenseIndex'>
      <SideNavigation/>
      <ul className='mainContent'>
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
