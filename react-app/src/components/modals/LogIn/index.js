import { React, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
// import { signUp } from '../../../store/session';
import goodeatsLogoWhite from '../../../media/goodeats_transparent_white.png'
import goodeatsSignupImg from '../../../media/signup_image.png'
import * as sessionActions from '../../../store/session'
import './LogInModal.css'

const LoginModal = (props) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const validationErrors = [];
    if (!email || email.length < 2) validationErrors.push("Please submit a valid email")
    if(!password || password.length < 5) validationErrors.push("Please submit a password with at least 5 characters")

    setErrors(validationErrors)
  }, [email, password])

  // console.log('this is onClose: ',props.onClose)

  const onLogin = async (e) => {
    e.preventDefault();
    // if (!errors.length) {
    const data = await dispatch(sessionActions.login(email, password));

    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const demoLogin = (e) => {
    e.preventDefault();
    setErrors([]);
    const email = 'demo@aa.io';
    const password = 'password';
    dispatch(sessionActions.login(
      email, password
    ))
  }

  if (!props.showLogin) {
    return null
  }

  return (
    <div className='signup-Modal' onClick={props.onClose}>
      <div className='signupModal-Content' onClick={e => e.stopPropagation()}>
        <div className='loginModal-Header'>
          <div>
            <img src={goodeatsLogoWhite} alt='goodeatsLogo' className='goodeatsLogo-Modal-Login'></img>
          </div>
          <div className="exitIcon-Login-Div">
            <i className="fas fa-times exitX" onClick={props.onClose}></i>
          </div>
          {/* <h4 className='signupModal-Title'>Sign Up</h4> */}
        </div>
        <div className='signupModal-Body'>
          <form onSubmit={onLogin}>
            <div className='signupModal-SignupTitle-Div'>
              <label className='signupModal-Title'>Login to Goodeats</label>
            </div>
              <ul className="errorHandling">
                {errors.map((error) => <li key={error} className='errorHandling'><i className="fas fa-exclamation errorExclamation"></i>{error}</li>)}
              </ul>
            {/* <div>
              <label>Username</label>
              <input
              type='text'
              name='username'
              onChange={updateUsername}
              value={username}
              placeholder='Username'
              className='signupModal-Input'
              ></input>
            </div> */}
            <div>
              {/* <label>Email</label> */}
              <input
              type='text'
              name='email'
              onChange={updateEmail}
              value={email}
              placeholder='Email'
              className='signupModal-Input'
              required
              ></input>
            </div>
            <div>
              {/* <label>Password</label> */}
              <input
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
              placeholder='Password'
              className='signupModal-Input'
              required
              ></input>
            </div>
            {/* <div>
              <label>Repeat Password</label>
              <input
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
              placeholder='Repeat Password'
              className='signupModal-Input'
              ></input>
            </div> */}
            {/* <button type='submit' className='signupModal-Signup-Button' onClick={!errors.length ? props.onClose : null}>Login</button> */}
            <button type='submit' className='loginModal-Login-Button'>Login</button>
            <button onClick={demoLogin} type="submit" className='DemoLogin-Btn'>Demo</button>
          </form>
          <div>
            <img src={goodeatsSignupImg} alt='goodeatsSignupImg' className='goodeatssignupImg-Modal'></img>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginModal;