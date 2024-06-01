import './ExpenseForm.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { thunkCreateExpense, thunkUpdateExpense } from '../../redux/expenses';

function ExpenseForm({expense, formType}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [expenseId] = useState(expense?.id);
  const [description, setDescription] = useState(expense?.description);
  const [category, setCategory] = useState(expense?.category);
  const [amount, setAmount] = useState(expense?.amount);
  const [shared_among, setSharedAmong] = useState(expense?.shared_among);
  const [bill_settled, setBillSettled] = useState(expense?.bill_settled);
  const [expense_date, setExpenseDate] = useState(expense?.expense_date);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const title = formType === 'Create Expense' ? 'Add an expense' : 'Update my expense';
  const onStatusChange = e => {
    setBillSettled(e.target.value);
  };
  const validateForm = () => {
    const newErrors = {};
    if (!description) {
      newErrors.description = 'Description is required';
    }
    if (!category) {
      newErrors.category = 'Category is required';
    }
    if (!amount) {
      newErrors.amount = 'Amount is required';
    }
    if (isNaN(Number(amount)) || Number(amount) < 0 || (amount.toString().split('.')[1]?.length > 2)) {
      newErrors.amount = 'Amount is invalid';
    }
    if (!shared_among) {
      newErrors.shared_among = 'Number of people is required';
    }
    if (isNaN(Number(shared_among)) || Number(shared_among) < 1) {
      newErrors.shared_among = 'Number of people is invalid';
    }
    if (!bill_settled) {
      newErrors.bill_settled = 'Status of bill is required';
    }
    if (!expense_date) {
      newErrors.expense_date = 'Expense date is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const isFormValid = validateForm();
    const dateObj = new Date(expense_date);
    const formattedExpenseDate = `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1).toString().padStart(2, '0')}-${dateObj.getDate().toString().padStart(2, '0')} ${dateObj.getHours().toString().padStart(2, '0')}:${dateObj.getMinutes().toString().padStart(2, '0')}:${dateObj.getSeconds().toString().padStart(2, '0')}`;
    if (isFormValid) {
      const formData = new FormData();
      formData.append('description', description);
      formData.append('category', category);
      formData.append('amount', amount);
      formData.append('shared_among', shared_among);
      formData.append('bill_settled', bill_settled);
      formData.append('expense_date', formattedExpenseDate);
      setIsLoading(true);
      try {
        if (formType === 'Update Expense') {
          await dispatch(thunkUpdateExpense(formData, expenseId));
        } else if (formType === 'Create Expense') {
          await dispatch(thunkCreateExpense(formData));
        }
      } catch (error) {
        console.error('Creating/updating expense form error', error);
      } finally {
        navigate('/expenses');
        setIsLoading(false);
      }
    }
  };
  const descriptionError = errors.description ? `${errors.description}` : null;
  const categoryError = errors.category ? `${errors.category}` : null;
  const amountError = errors.amount ? `${errors.amount}` : null;
  const sharedAmongError = errors.shared_among ? `${errors.shared_among}` : null;
  const billSettledError = errors.bill_settled ? `${errors.bill_settled}` : null;
  const expenseDateError = errors.expense_date ? `${errors.expense_date}` : null;

  return (
    <form className='expenseForm' onSubmit={handleSubmit}>
      <p className='expenseFormHeading'>{title}</p>
      <div className='errors'>
        <ul>{descriptionError}</ul>
        <ul>{categoryError}</ul>
        <ul>{amountError}</ul>
        <ul>{sharedAmongError}</ul>
        <ul>{billSettledError}</ul>
        <ul>{expenseDateError}</ul>
      </div>
      <label className='expenseFormLabel'>
        Description:<br/>
        <input className='expenseFormNormal' type='text' value={description} placeholder='Enter a description' onChange={(e) => setDescription(e.target.value)} required/><br/>
      </label>
      <label className='expenseFormLabel'>
        Category:<br/>
      </label>
      <select className='expenseFormNormal' value={category} name='Category' onChange={(e) => setCategory(e.target.value)} required><br/>
        <option value='' disabled>Please select a category</option>
        <option>Entertainment</option>
        <option>Food and drink</option>
        <option>Home</option>
        <option>Life</option>
        <option>Transportation</option>
        <option>Utilities</option>
        <option>Uncategorized</option>
      </select><br/>
      <label className='expenseFormLabel'>
        Amount:<br/>
        <input className='expenseFormNormal' type='text' value={amount} placeholder='$0.00' onChange={(e) => setAmount(e.target.value)} required/><br/>
      </label>
      <div className='expenseFormLabel'>
        Bill settled?<br/>
        <input type='radio' value='True' checked={bill_settled === 'True'} onChange={onStatusChange} required/>Yes
        <input type='radio' value='False' checked={bill_settled === 'False'} onChange={onStatusChange} required/>No
      </div>
      <label className='expenseFormLabel'>
        Date:<br/>
        <input className='expenseFormNormal' type='date' value={expense_date} onChange={(e) => setExpenseDate(e.target.value)} required/><br/>
      </label>
      {formType === 'Create Expense' &&
        <label className='expenseFormLabel'>
          Number of people involved in this expense including yourself:<br/>
          <input className='expenseFormNormal' type='text' value={shared_among} placeholder='Number of people' onChange={(e) => setSharedAmong(e.target.value)} required/><br/>
        </label>
      }
      <button className='expenseFormButton' type='submit'>{title}</button>
    </form>
  );
}

export default ExpenseForm;
