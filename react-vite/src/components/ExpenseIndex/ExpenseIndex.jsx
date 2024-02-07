import './ExpenseIndex.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllExpenses } from '../../redux/expenses';
import ExpenseIndexItem from '../ExpenseIndexItem';

function ExpenseIndex() {
  const dispatch = useDispatch();
  const expenses = useSelector(state => state.expenses.expenses);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(thunkGetAllExpenses());
        setIsLoading(false);
      } catch (error) {
        console.error('Fetching expenses error', error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [dispatch]);
  if (isLoading) return (<>Loading...</>);

  return (
    <div>
      <ul className='expenseIndex'>
        {expenses.map((expense) => (
          <li className='eachExpense' key={expense.Id}>
            <ExpenseIndexItem expense={expense} key={expense.Id}/>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseIndex;
