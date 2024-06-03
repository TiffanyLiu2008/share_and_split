import './ExpenseIndex.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllExpenses } from '../../redux/expenses';
import { Chart } from 'react-google-charts';
import SideNavigation from '../Navigation/SideNavigation';
import ExpenseIndexItem from '../ExpenseIndexItem';
import expensesPic from '../../../../images/expenses.png';

function ExpenseIndex() {
  const dispatch = useDispatch();
  const [categoryChartData, setCategoryChartData] = useState([]);
  const [dateChartData, setDateChartData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(thunkGetAllExpenses());
      } catch (error) {
        console.error('Fetching expenses error', error);
      }
    };
    fetchData();
  }, [dispatch]);
  const expenses = useSelector(state => state.expenses.expenses);
  const noExpense = Array.isArray(expenses) && expenses.length === 0;
  const isLoading = !expenses;
  useEffect(() => {
    if (expenses) {
      const categoryTotals = expenses.reduce((acc, expense) => {
        if (!acc[expense.category]) {
          acc[expense.category] = 0;
        }
        acc[expense.category] += expense.each_person;
        return acc;
      }, {});
      const categoryData = [
        ['Category', 'Amount'],
        ...Object.entries(categoryTotals).map(([category, amount]) => [category, amount])
      ];
      setCategoryChartData(categoryData);
      const dateData = [
        ['Date', 'Amount'],
        ...expenses.map(expense => [new Date(expense.expense_date).toLocaleDateString(), expense.each_person])
      ];
      setDateChartData(dateData);
    }
  }, [expenses]);

  if (isLoading) return (<>Loading...</>);

  return (
    <div className='expenseIndex'>
      <SideNavigation/>
      <div className='chartContainer'>
        <Chart
          chartType='PieChart'
          data={categoryChartData}
          options={{
            title: 'Expense Breakdown by Category',
            legend: 'none'
          }}
          width='400px'
          height='400px'
        />
        <Chart
          chartType='LineChart'
          data={dateChartData}
          options={{
            title: 'Expense Over Time',
            hAxis: {title: 'Date'},
            vAxis: {title: 'Amount'},
            legend: 'none'
          }}
          width='400px'
          height='400px'
        />
      </div>
      <ul className='mainContent'>
        {noExpense &&
          <div>
            <p className='noExpense'>You have not added any expenses yet.</p>
            <p className='noExpense'>To add a new expense, click the blue "Add an expense" button.</p>
            <img className='expenseIndexImage' src={expensesPic} alt='expenseIndexPic'/>
          </div>
        }
        {expenses.map((expense) => (
          <li>
            <ExpenseIndexItem expense={expense} key={expense.Id}/>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseIndex;
