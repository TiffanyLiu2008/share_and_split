import ExpenseForm from '../ExpenseForm';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { thunkGetExpenseDetails } from '../../redux/expenses';

function UpdateExpense() {
  const dispatch = useDispatch();
  const { expenseId } = useParams;
  const expense = useSelector(state => state.expenses[expenseId]);
  useEffect(() => {
    dispatch(thunkGetExpenseDetails(expenseId));
  }, [dispatch, expenseId]);
  if (!expense) return (<></>);

  return (
    Object.keys(expense).length > 1 && (
      <>
        <ExpenseForm expense={expense} formType='Update Expense'/>
      </>
    )
  );
}

export default UpdateExpense;
