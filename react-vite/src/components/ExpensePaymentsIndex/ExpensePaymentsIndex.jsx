import './ExpensePaymentsIndex.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetExpensePayments } from '../../redux/payments';
import ExpensePaymentsIndexItem from '../ExpensePaymentsIndexItem/ExpensePaymentsIndexItem';

function ExpensePaymentsIndex() {
  const dispatch = useDispatch();
  const {expenseId} = useParams();
  const payments = useSelector(state => state.payments[expenseId]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
      dispatch(thunkGetExpensePayments(expenseId)).then(() => setIsLoading(false));
  }, [dispatch, expenseId]);
  if (isLoading) return (<>Loading...</>);

  return (
    <div>
      <ul className='expensePaymentsIndex'>
        {payments.map((payment) => {
          <li className='eachPayment' key={payment.id}>
            <ExpensePaymentsIndexItem eachPayment={payment} key={payment.id}/>
          </li>
        })}
      </ul>
    </div>
  );
}

export default ExpensePaymentsIndex;
