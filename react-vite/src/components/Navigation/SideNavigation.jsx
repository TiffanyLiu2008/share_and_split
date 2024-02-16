import './SideNavigation.css';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

function SideNavigation() {

  return (
    <div className='sideNav'>
      <NavLink to='/expenses/new' className='sideNavButton'>Add an expense</NavLink>
      <NavLink to='/expenses' className='sideNavButton'>My expenses</NavLink>
      <NavLink to='/payments' className='sideNavButton'>My payments</NavLink>
      <NavLink to='/friends' className='sideNavButton'>My friends</NavLink>
    </div>
  );
}

export default SideNavigation;
