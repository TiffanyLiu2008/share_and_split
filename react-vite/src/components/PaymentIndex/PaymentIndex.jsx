import './PaymentIndex.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllPayments } from '../../redux/payments';
import PaymentIndexItem from '../PaymentIndexItem';

function PaymentIndex() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(thunkGetAllPayments());
      } catch (error) {
        console.error('Fetching payments error', error);
      }
    };
    fetchData();
  }, [dispatch]);
  const payments = useSelector(state => state.payments.payments);
  const isLoading = !payments;
  if (isLoading) return (<>Loading...</>);

  return (
    <div>
      <ul className='paymentIndex'>
        {payments.map((payment) => (
          <li className='eachPayment' key={payment.Id}>
            <PaymentIndexItem payment={payment} key={payment.id}/>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PaymentIndex;
