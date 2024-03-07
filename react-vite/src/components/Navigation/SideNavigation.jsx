import './SideNavigation.css';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

function SideNavigation() {
  const location = useLocation();

  return (
    <div className='sideNav'>
      <NavLink to='/new' className='sideNavButton' activeClassName='active' exact>Add an expense</NavLink>
      <NavLink to='/expenses' className='sideNavButton' activeClassName='active' exact>My expenses</NavLink>
      <NavLink to='/payments' className='sideNavButton' activeClassName='active'>My payments</NavLink>
      <NavLink to='/friends' className='sideNavButton' activeClassName='active'>My friends</NavLink>
    </div>
  );
}

export default SideNavigation;
