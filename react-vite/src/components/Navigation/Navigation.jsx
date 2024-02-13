import './Navigation.css';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import logoImg from '../../../../images/logo.jpg';

function Navigation() {

  return (
    <div className='nav'>
      <ProfileButton/>
      <NavLink to="/"><img className='navLogo' src={logoImg} alt='logo'/></NavLink>
    </div>
  );
}

export default Navigation;
