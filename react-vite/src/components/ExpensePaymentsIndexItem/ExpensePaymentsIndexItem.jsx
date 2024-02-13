import './ExpensePaymentsIndexItem.css';

function ExpensePaymentsIndexItem({payment}) {
  const {each_person, borrower_username} = payment;
  const formattedEachPerson = Number(each_person).toFixed(2);

  return (
    <div>
      <p className='paymentBorrowerInfo'>{borrower_username} ${formattedEachPerson}</p>
    </div>
  );
}

export default ExpensePaymentsIndexItem;
