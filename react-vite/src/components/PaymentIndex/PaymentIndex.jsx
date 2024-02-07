import './PaymentIndex.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllPayments } from '../../redux/payments';
import PaymentIndexItem from '../PaymentIndexItem';

function PaymentIndex() {
  const dispatch = useDispatch();
  const payments = useSelector(state => Object.values(state.payments));
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    dispatch(thunkGetAllPayments()).then(() => setIsLoading(false));
  }, [dispatch]);

  return (
    <div>
      <h1>Welcome</h1>
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
