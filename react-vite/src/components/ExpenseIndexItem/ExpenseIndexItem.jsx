import './ExpenseIndexItem.css';
import { Link } from 'react-router-dom';
import entertainment from '../../../../images/entertainment.png';
import food_and_drink from '../../../../images/food_and_drink.png';
import home from '../../../../images/home.png';
import life from '../../../../images/life.png';
import transportation from '../../../../images/transportation.png';
import utilities from '../../../../images/utilities.png';
import uncategorized from '../../../../images/uncategorized.png';

function ExpenseIndexItem({expense}) {
  const {description, category, expense_date, each_person} = expense;
  const convertDate = (oldDate) => {
    const dateObject = new Date(oldDate);
    const month = dateObject.toLocaleString('en-us', { month: 'long' });
    const day = dateObject.getDate();
    const year = dateObject.getFullYear();
    return `${month} ${day}, ${year}`;
  };
  const date = convertDate(expense_date);
  const formattedEachPerson = each_person.toFixed(2);
  const categoryPic = (category) => {
    switch (category) {
      case 'Entertainment':
        return entertainment;
      case 'Food and drink':
        return food_and_drink;
      case 'Home':
        return home;
      case 'Life':
        return life;
      case 'Transportation':
        return transportation;
      case 'Utilities':
        return utilities;
      default:
        return uncategorized;
    }
  };

  return (
    <div className='eachExpense'>
      <Link className='linkToExpense' to={`/expenses/${expense.id}`}>
        <p className='expenseExpenseDate'>{date}</p>
        <p className='expenseDescription'>{description}</p>
        <p className='expenseAmount'>${formattedEachPerson}</p>
        <img className='expenseCategoryPic' src={categoryPic(category)} alt='categoryPic'/>
      </Link>
    </div>
  );
}

export default ExpenseIndexItem;
