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
    <ExpenseForm expense={expense} formType='Create Expense'/>
  );
}

export default CreateExpense;
