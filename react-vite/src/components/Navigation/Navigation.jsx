import './Navigation.css';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import logoImg from '../../../../images/logo.jpg';

function Navigation() {

  return (
    <div className='topNav'>
      <div className='logoName'>
        <ul>
          <NavLink to="/"><img className='topNavLogo' src={logoImg} alt='logo'/></NavLink>
        </ul>
        <ul>
          <NavLink to="/" className='topNavName'><p className='topNavName'>Share & Split</p></NavLink>
        </ul>
      </div>
      <ProfileButton/>
    </div>
  );
}

export default Navigation;
