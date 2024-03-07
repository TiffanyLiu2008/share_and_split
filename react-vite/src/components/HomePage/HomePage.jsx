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
        <div className='homePageText'>
          <p>Less stress when</p>
          <p>sharing expenses</p>
          <p>with anyone.</p>
        </div>
        <div className='homePageImages'>
          <img src={image} alt='homePageSmallImage1'/>
          <img src={image} alt='homePageSmallImage2'/>
          <img src={image} alt='homePageSmallImage3'/>
          <img src={image} alt='homePageSmallImage4'/>
        </div>
        <img className='homePageImage' src={image} alt='homePageLargeImage'/>
      </div>
    </div>
  );
}

export default HomePage;
