import './HomePage.css';
import { useSelector } from 'react-redux';
import image from '../../../../images/home_page.png';
import SideNavigation from '../Navigation/SideNavigation';

function HomePage() {
  const sessionUser = useSelector(state => state.session.user);
  const sessionUserId = sessionUser ? sessionUser.id : null;

  return (
    <div className='homePage'>
      {sessionUserId &&
        <SideNavigation/>
      }
      <div className='mainContent'>
        <img className='homePageImage' src={image} alt='homePageImage'/>
      </div>
    </div>
  );
}

export default HomePage;
