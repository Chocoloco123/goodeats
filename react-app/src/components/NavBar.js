
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useSelector } from 'react-redux';
import goodeatsLogo from '../media/goodeats_transparent.png'
import './navbar.css'

const NavBar = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const userDisplayName = sessionUser?.username
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
          <li>
            {sessionUser ? 
              <span>Welcome {userDisplayName}!</span> :
              null
            }
          </li>
          <li className='navLi'>
            {sessionUser ? null :
              <NavLink to='/login' exact={true} activeClassName='active'>
                Login
              </NavLink>
            }
          </li>
          <li className='navLi'>
            {sessionUser ? null :
              <NavLink to='/sign-up' exact={true} activeClassName='active'>
                Sign Up
              </NavLink>
            }
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
