import './ExpensePaymentsIndexItem.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function ExpensePaymentsIndexItem({payment}) {
  const {each_person, borrower_username} = payment;

  return (
    <div>
      <p className='paymentBorrowerUsername'>{borrower_username}</p>
      <p className='paymentEachPerson'>{each_person}</p>
    </div>
  );
}

export default ExpensePaymentsIndexItem;
