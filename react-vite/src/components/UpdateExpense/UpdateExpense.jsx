import ExpenseForm from '../ExpenseForm';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetExpenseDetails } from '../../redux/expenses';

function UpdateExpense() {
  const dispatch = useDispatch();
  const {expenseId} = useParams();
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
  const expense = useSelector(state => state.expenses[expenseId]);
  const isLoading = !expense;
  if (isLoading) return (<>Loading...</>);

  return (
    <div>
      <ExpenseForm expense={expense} formType='Update Expense'/>
    </div>
  );
}

export default UpdateExpense;
