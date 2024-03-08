import './HomePage.css';
import { useSelector } from 'react-redux';
import SideNavigation from '../Navigation/SideNavigation';
import entertainment from '../../../../images/entertainment.png';
import food from '../../../../images/food.png';
import housing from '../../../../images/housing.png';
import transportation from '../../../../images/transportation.png';

function HomePage() {
  const sessionUser = useSelector(state => state.session.user);
  const sessionUserId = sessionUser ? sessionUser.id : null;

  return (
    <div className='homePage'>
      {sessionUserId &&
        <SideNavigation/>
      }
      {!sessionUserId &&
        <div className='mainContent'>
          <div className='homePageText'>
            <p>Less stress when sharing expenses with anyone...</p>
          </div>
          <div className='homePageImages'>
            <img src={entertainment} alt='homePageImage1'/>
            <img src={food} alt='homePageImage2'/>
            <img src={housing} alt='homePageImage3'/>
            <img src={transportation} alt='homePageImage4'/>
          </div>
        </div>
      }
    </div>
  );
}

export default HomePage;
