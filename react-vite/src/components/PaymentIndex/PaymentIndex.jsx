import './PaymentIndex.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllPayments } from '../../redux/payments';
import SideNavigation from '../Navigation/SideNavigation';
import PaymentIndexItem from '../PaymentIndexItem';
import paymentsPic from '../../../../images/payments.png';

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
  const noPayment = Array.isArray(payments) && payments.length === 0;
  const isLoading = !payments;
  if (isLoading) return (<>Loading...</>);

  return (
    <div className='paymentIndex'>
      <SideNavigation/>
      <ul className='mainContent'>
        {noPayment &&
          <div>
            <p className='noPayment'>You are all settled up. Awesome!</p>
            <img className='paymentIndexImage' src={paymentsPic} alt='paymentIndexPic'/>
          </div>
        }
        {payments.map((payment) => (
          <li>
            <PaymentIndexItem payment={payment} key={payment.id}/>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PaymentIndex;
