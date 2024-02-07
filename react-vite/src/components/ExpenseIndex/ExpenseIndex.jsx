import './ExpenseIndex.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllExpenses } from '../../redux/expenses';
import ExpenseIndexItem from '../ExpenseIndexItem';

function ExpenseIndex() {
  const dispatch = useDispatch();
  const expenses = useSelector(state => Object.values(state.expenses));
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    dispatch(thunkGetAllExpenses()).then(() => setIsLoading(false));
  }, [dispatch]);

  return (
    <div>
      <h1>Welcome</h1>
      <ul className='expenseIndex'>
        {expenses.map((expense) => (
          <li className='eachExpense' key={expense.Id}>
            <ExpenseIndexItem expense={expense} key={expense.id}/>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseIndex;
