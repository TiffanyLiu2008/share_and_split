import './ExpenseIndexItem.css';
import { Link } from 'react-router-dom';
import entertainment from '../../../../images/entertainment.png';
import food from '../../../../images/food.png';
import housing from '../../../../images/housing.png';
import others from '../../../../images/others.png';
import transportation from '../../../../images/transportation.png';

function ExpenseIndexItem({expense}) {
  const {description, category, created_at, each_person} = expense;
  const convertDate = (oldDate) => {
    const dateObject = new Date(oldDate);
    const month = dateObject.toLocaleString('en-us', { month: 'long' });
    const day = dateObject.getDate();
    const year = dateObject.getFullYear();
    return `${month} ${day}, ${year}`;
  };
  const date = convertDate(created_at);
  const formattedEachPerson = each_person.toFixed(2);
  const categoryPic = (category) => {
    switch (category) {
      case 'Entertainment':
        return entertainment;
      case 'Food and drink':
        return food;
      case 'Home':
        return home;
      case 'Life':
        return others;
      case 'Transportation':
        return transportation;
      case 'Utilities':
        return others;
      default:
        return others;
    }
  };

  return (
    <div className='eachExpense'>
      <Link className='linkToExpense' to={`/expenses/${expense.id}`}>
        <p className='expenseCreatedAt'>{date}</p>
        <p className='expenseDescription'>{description}</p>
        <p className='expenseAmount'>${formattedEachPerson}</p>
        <img className='expenseCategoryPic' src={categoryPic(category)} alt='categoryPic'/>
      </Link>
    </div>
  );
}

export default ExpenseIndexItem;
