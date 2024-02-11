import './ExpenseForm.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const title = formType === 'Create Expense' ? 'Create an expense' : 'Update my expense';
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
    if (isNaN(Number(amount)) || Number(amount) < 0) {
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
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const isFormValid = validateForm();
    if (isFormValid) {
      const formData = new FormData();
      formData.append('description', description);
      formData.append('category', category);
      formData.append('amount', amount);
      formData.append('shared_among', shared_among);
      formData.append('bill_settled', bill_settled);
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
    };
  };
  const descriptionError = errors.description ? `Description: ${errors.description}` : null;
  const categoryError = errors.category ? `Category: ${errors.category}` : null;
  const amountError = errors.amount ? `Amount: ${errors.amount}` : null;
  const sharedAmongError = errors.shared_among ? `Number of people: ${errors.shared_among}` : null;
  const billSettledError = errors.bill_settled ? `Status of bill: ${errors.bill_settled}` : null;

  return (
    <form onSubmit={handleSubmit}>
      <p className='expenseFormHeading'>{title}</p>
      <div className='errors'>
        <ul>{descriptionError}</ul>
        <ul>{categoryError}</ul>
        <ul>{amountError}</ul>
        <ul>{sharedAmongError}</ul>
        <ul>{billSettledError}</ul>
      </div>
      <label className='expenseFormNormal'>
        Description<br/>
        <input className='expenseFormNormal' type='text' value={description} placeholder='Description' onChange={(e) => setDescription(e.target.value)} required/><br/>
      </label>
      Category<br/>
      <select className='expenseFormNormal' value={category} name='Category' onChange={(e) => setCategory(e.target.value)} required><br/>
        <option>Housing</option>
        <option>Food</option>
        <option>Transporation</option>
        <option>Entertainment</option>
        <option>Others</option>
      </select><br/>
      <label className='expenseFormNormal'>
        Amount<br/>
        <input className='expenseFormNormal' type='text' value={amount} placeholder='Amount' onChange={(e) => setAmount(e.target.value)} required/><br/>
      </label>
      <div className='expenseFormBillSettled'>
        Bill settled?<br/>
        <input type='radio' value='True' checked={bill_settled === 'True'} onChange={onStatusChange} required/>Yes
        <input type='radio' value='False' checked={bill_settled === 'False'} onChange={onStatusChange} required/>No
      </div>
      {formType === 'Create Expense' &&
        <label className='expenseFormNormal'>
          Number of people involved including yourself:<br/>
          <input className='expenseFormNormal' type='text' value={shared_among} placeholder='Number of people' onChange={(e) => setSharedAmong(e.target.value)} required/><br/>
        </label>
      }
      <button className='submitExpenseButton' type='submit'>{title}</button>
    </form>
  );
}

export default ExpenseForm;
