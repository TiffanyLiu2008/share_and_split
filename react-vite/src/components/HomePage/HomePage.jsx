import './HomePage.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import image from '../../../../images/home_page.png';

function HomePage() {
  const sessionUser = useSelector(state => state.session.user);
  const sessionUserId = sessionUser ? sessionUser.id : null;

  return (
    <div>
        {!sessionUserId &&
        <div>
          <img className='homePageImage' src={image} alt='homePageImage'/>
        </div>
      }
      {sessionUserId &&
        <div>
          <Link to={'/expenses/new'}><button className='addExpenseButton'>Add an expense</button></Link>
          <Link to={'/expenses'}><button className='myExpensesButton'>My expenses</button></Link>
          <Link to={'/payments'}><button className='myPaymentsButton'>My payments</button></Link>
          <Link to={'/friends'}><button className='myFriendsButton'>My friends</button></Link>
        </div>
      }
    </div>
  );
}

export default HomePage;
