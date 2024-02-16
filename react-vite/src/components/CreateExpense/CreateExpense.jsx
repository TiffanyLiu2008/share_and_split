import './CreateExpense.css';
import SideNavigation from '../Navigation/SideNavigation';
import ExpenseForm from '../ExpenseForm';

function CreateExpense() {
  const expense = {
    description: '',
    category: '',
    amount: '',
    shared_among: '',
    bill_settled: ''
  };

  return (
    <div className='createExpense'>
      <SideNavigation/>
      <div className='mainContent'>
        <ExpenseForm expense={expense} formType='Create Expense'/>
      </div>
    </div>
  );
}

export default CreateExpense;
