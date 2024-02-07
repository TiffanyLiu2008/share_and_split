import './ExpenseForm.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkCreateExpense, thunkUpdateExpense } from '../../redux/expenses';

function ExpenseForm({expense, formType}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [description, setDescription] = useState(expense?.description);
  const [category, setCategory] = useState(expense?.category);
  const [amount, setAmount] = useState(expense?.amount);
  const [sharedAmong, setSharedAmnong] = useState(expense?.shared_among);
  const [billSettled, setBillSettled] = useState(expense?.bill_settled);
  const [errors, setErrors] = useState({});
  const title = formType === 'Create Expense' ? 'Create a New Expense' : 'Update Your Expense';
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    expense = {...expense, description, category, amount, shared_among, bill_settled};
    let newExpense;
    if (formType === 'Update Expense') {
      dispatch(thunkUpdateExpense(expense))
      .then((newExpense) => navigate(`/expenses/${newExpense.id}`))
      .catch(async (response) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
    } else if (formType === 'Create Expense') {
      dispatch(thunkCreateExpense(expense))
      .then((newExpense) => navigate(`/expenses/${newExpense.id}`))
      .catch(async (response) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
    }
  };
  const descriptionError = errors.description ? `Description: ${errors.description}` : null;
  const categoryError = errors.category ? `Category: ${errors.category}` : null;
  const amountError = errors.amount ? `Amount: ${errors.amount}` : null;
  const sharedAmoungError = errors.shared_amoung ? `Number of people: ${errors.shared_amoung}` : null;
  const billSettledError = errors.bill_settled ? `Settled?: ${errors.bill_settled}` : null;

  return (
    <form onSubmit={handleSubmit}>
      <p className='expenseFormHeading'>{title}</p>
      <div className='errors'>
        <ul>{descriptionError}</ul>
        <ul>{categoryError}</ul>
        <ul>{amountError}</ul>
        <ul>{sharedAmoungError}</ul>
        <ul>{billSettledError}</ul>
      </div>
      <label className='expenseFormNormal'>
        <input className='expenseFormNormal' type='text' value={description} placeholder='Description' onChange={(e) => setDescription(e.target.value)} required/>
      </label>
      <label className='expenseFormNormal'>
        <input className='expenseFormNormal' type='text' value={category} placeholder='Category' onChange={(e) => setCategory(e.target.value)} required/>
      </label>
      <label className='expenseFormNormal'>
        <input className='expenseFormNormal' type='text' value={amount} placeholder='Amount' onChange={(e) => setAmount(e.target.value)} required/>
      </label>
      <label className='expenseFormNormal'>
        <input className='expenseFormNormal' type='text' value={sharedAmong} placeholder='Number of people involved including yourself' onChange={(e) => setSharedAmnong(e.target.value)} required/>
      </label>
      <label className='expenseFormNormal'>
        <input className='expenseFormNormal' type='text' value={billSettled} placeholder='Bill settled?' onChange={(e) => setBillSettled(e.target.value)} required/>
      </label>
      <button className='submitExpenseButton' type='submit'>{title}</button>
    </form>
  );
}

export default ExpenseForm;
