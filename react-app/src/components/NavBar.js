
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useSelector } from 'react-redux';
import goodeatsLogo from '../media/goodeats_transparent.png'
import './navbar.css'

const NavBar = () => {
  const sessionUser = useSelector((state) => state.session?.user);
  
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
          {/* <li className='navLi'>
            <NavLink to='/' exact={true} activeClassName='active' className='homeBtn-Nav'>
              Home
            </NavLink>
          </li> */}
          <li className='navLi'>
            {sessionUser ? 
              <span>Welcome {sessionUser?.username}!</span> :
              null
            }
          </li>
          <li className='navLi'>
            {sessionUser ? null :
              <NavLink to='/login' exact={true} activeClassName='active' className="loginBtn-Nav"> 
                Login
              </NavLink>
            }
          </li>
          <li className='navLi'>
            {sessionUser ? null :
              <NavLink to='/sign-up' exact={true} activeClassName='active' className="signupBtn-Nav">
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
