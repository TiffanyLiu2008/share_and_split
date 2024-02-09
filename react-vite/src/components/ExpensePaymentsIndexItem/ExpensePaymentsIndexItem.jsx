import './ExpensePaymentsIndexItem.css';

function ExpensePaymentsIndexItem({payment}) {
  const {each_person, borrower_username} = payment;

  return (
    <div>
      <p className='paymentBorrowerInfo'>{borrower_username} ${each_person}</p>
    </div>
  );
}

export default ExpensePaymentsIndexItem;
