import './Navigation.css';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import logoImg from '../../../../images/logo.jpg';

function Navigation() {

  return (
    <div className='topNav'>
      <NavLink to="/"><img className='topNavLogo' src={logoImg} alt='logo'/></NavLink>
      <ProfileButton/>
    </div>
  );
}

export default Navigation;
