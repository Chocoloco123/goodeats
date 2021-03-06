
import { React, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useSelector } from 'react-redux';
import goodeatsLogo from '../media/goodeats_transparent.png'
import SignUpModal from './modals/SignUp';
import LoginModal from './modals/LogIn';
import SearchBar from './Search/SearchRestaurants';
import './navbar.css'


const NavBar = () => {
  const location = useLocation();

  // ! modal
  const [signupModal, setSignupModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);

  const handleSignupModal = (e) => {
    e.preventDefault();
    setSignupModal(true);
    // if (signupModal === false) {
    //   setSignupModal(true);
    //   // setLoginModal(false);
    // }
  }

  const handleLoginModal = (e) => {
    e.preventDefault();
    setLoginModal(true);
    // if (loginModal === false) {
    //   setLoginModal(true);
    //   // setSignupModal(false);
    // }
  }

  const sessionUser = useSelector((state) => state.session?.user);
  // console.log('this is sessionUser: ',sessionUser?.username)

  // if (sessionUser?.username) {
  //   setSignupModal(false)
  //   setLoginModal(false)
  // } else {
  //   setSignupModal(true);
  //   setLoginModal(true);
  // }

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
            {location.pathname !== "/" && typeof location.pathname === "string" ? <SearchBar /> : null}
          </li>
          <li className='navLi'>
            {sessionUser ? 
              <span className='welcomeUsername-Span'>Welcome {sessionUser?.username}!</span> :
              null
            }
          </li>
          <li className='navLi AboutBtn'>
            <NavLink to='/About' className="signupBtn-Nav" exact={true} >
              About
            </NavLink>
          </li>
          <li className='navLi'>
            {sessionUser ? null :
              <button type='button' className="signupBtn-Nav" onClick={handleSignupModal}>
                Sign Up
              </button>
            }
            {/* <NavLink to='/sign-up' exact={true} activeClassName='active'>
              Sign Up
            </NavLink> */}
            {sessionUser ? null :
              <button type='button' className="loginBtn-Nav" onClick={handleLoginModal}>
                Login
              </button>
              // {/* <NavLink to='/login' exact={true} activeClassName='active' className="loginBtn-Nav">  */}
              // <NavLink to='/login' exact={true} activeClassName='active'>
              //   Login
              // </NavLink>
            }
          </li>
          {/* <li className='navLi'>
            {sessionUser ? null :
              <NavLink to='/sign-up' exact={true} activeClassName='active' className="signupBtn-Nav">
                Sign Up
              </NavLink>
            }
          </li> */}
          <li className='navLi'>
            <LogoutButton />
          </li>
        </div>
      </ul>
      { 
      (!sessionUser?.username || !sessionUser) ?
      // (signupModal === true) ?
        (signupModal && (
          <SignUpModal
            show={signupModal} // shows modals current bool value (T/F)
            onClose={() => setSignupModal(false)
            } // pass in setSignupModal to reset to F to close modal
          />
          )) : null
        // && setSignupModal(false)) : null
      }
      { 
      (!sessionUser?.username || !sessionUser) ?
        (loginModal && (
          <LoginModal
            showLogin={loginModal} // shows modals current bool value (T/F)
            onClose={() => setLoginModal(false)} // pass in setLoginModal to reset to F to close modal
          />
        ))
        : null
      }
    </nav>
  );
}

export default NavBar;
