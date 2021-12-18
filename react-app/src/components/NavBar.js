
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import goodeatsLogo from '../media/goodeats_transparent.png'
import './navbar.css'

const NavBar = () => {
  return (
    <nav>
      <ul className='navContainerDiv separateLogo'>
        <div className="logoDivContainer">
          <li className='navLi'>
            <NavLink to='/' exact={true} activeClassName='active'>
              <img src={goodeatsLogo} alt='goodeatsLogo' className='goodeatsLogoNav'></img>
            </NavLink>
          </li>

        </div>
        <div className='navContainerDiv'>
          <li className='navLi'>
            <NavLink to='/' exact={true} activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li className='navLi'>
            <NavLink to='/login' exact={true} activeClassName='active'>
              Login
            </NavLink>
          </li>
          <li className='navLi'>
            <NavLink to='/sign-up' exact={true} activeClassName='active'>
              Sign Up
            </NavLink>
          </li>
          {/* <li className='navLi'>
            <NavLink to='/users' exact={true} activeClassName='active'>
              Users
            </NavLink>
          </li> */}
          <li className='navLi'>
            <LogoutButton />
          </li>
        </div>
      </ul>
    </nav>
  );
}

export default NavBar;
