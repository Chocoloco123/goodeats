
import { React, useState } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import goodeatsLogo from '../media/goodeats_transparent.png'
import SignUpModal from './modals/SignUp';
import './navbar.css'


const NavBar = () => {
  // ! modal
  const [signupModal, setSignupModal] = useState(false);

  const handleSignupModal = (e) => {
    e.preventDefault()
    setSignupModal(true);
  }

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
            <button type='button' onClick={handleSignupModal}>
              Sign Up
            </button>
            {/* <NavLink to='/sign-up' exact={true} activeClassName='active'>
              Sign Up
            </NavLink> */}
          </li>
          <li className='navLi'>
            <LogoutButton />
          </li>
        </div>
      </ul>
      {
        signupModal && (
          <SignUpModal
            show={signupModal} // shows modals current bool value (T/F)
            onClose={() => setSignupModal(false)} // pass in setSignupModal to reset to F to close modal
          />
        )
      }
    </nav>
  );
}

export default NavBar;
