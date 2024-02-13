import './ExpensePaymentsIndex.css';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetExpensePayments } from '../../redux/payments';
import ExpensePaymentsIndexItem from '../ExpensePaymentsIndexItem/ExpensePaymentsIndexItem';

function ExpensePaymentsIndex() {
  const dispatch = useDispatch();
  const {expenseId} = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(thunkGetExpensePayments(expenseId));
      } catch (error) {
        console.error('Fetching expense payments error', error);
      }
    };
    fetchData();
  }, [dispatch, expenseId]);
  const payments = useSelector(state => state.payments[expenseId]);
  const isLoading = !payments;
  if (isLoading) return (<>Loading...</>);

  return (
    <div>
      <ul className='expensePaymentsIndex'>
        {Object.values(payments).map((payment) => (
          <li className='eachPayment' key={payment.id}>
            <ExpensePaymentsIndexItem payment={payment} key={payment.id}/>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpensePaymentsIndex;
