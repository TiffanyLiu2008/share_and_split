import './HomePage.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
        <div className='homePageButtons'>
          <Link to={'/expenses/new'}><button className='homePageButton'>Add an expense</button></Link><br/>
          <Link to={'/expenses'}><button className='homePageButton'>My expenses</button></Link><br/>
          <Link to={'/payments'}><button className='homePageButton'>My payments</button></Link><br/>
          <Link to={'/friends'}><button className='homePageButton'>My friends</button></Link><br/>
        </div>
      }
    </div>
  );
}

export default HomePage;
