import { React, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { signUp } from '../../../store/session';
import goodeatsLogoWhite from '../../../media/goodeats_transparent_white.png'
import goodeatsSignupImg from '../../../media/signup_image.png'
import './SignUpModal.css'

const SignUpModal = (props) => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  // const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const validationErrors = [];
    if (!username || username.length < 2) validationErrors.push("Please submit a username")
    if (!email || email.length < 2) validationErrors.push("Please submit a valid email")
    if(!password || password.length < 5) validationErrors.push("Please submit a password with at least 5 characters")
    if (!repeatPassword || repeatPassword.length < 5 || repeatPassword !== password) validationErrors.push("Please submit the matched password")

    setErrors(validationErrors)
  }, [username, email, password, repeatPassword])

  const onSignUp = async (e) => {
    e.preventDefault();
    if (!errors.length) {
      if (password === repeatPassword) {
        const data = await dispatch(signUp(username, email, password));
        props.onClose()
        if (data) {
        setErrors(data)
      }
    }
      // if (data) {
      //   setErrors(data)
      // }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (!props.show) {
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
          <form onSubmit={onSignUp}>
            <div className='signupModal-SignupTitle-Div'>
              <label className='signupModal-Title'>Sign up for Goodeats</label>
            </div>
              <ul className="errorHandling">
                {errors.map((error) => <li key={error} className='errorHandling'><i className="fas fa-exclamation errorExclamation"></i>{error}</li>)}
              </ul>
            <div>
              {/* <label>Username</label> */}
              <input
              type='text'
              name='username'
              onChange={updateUsername}
              value={username}
              placeholder='Username'
              className='signupModal-Input'
              ></input>
            </div>
            <div>
              {/* <label>Email</label> */}
              <input
              type='text'
              name='email'
              onChange={updateEmail}
              value={email}
              placeholder='Email'
              className='signupModal-Input'
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
              ></input>
            </div>
            <div>
              {/* <label>Repeat Password</label> */}
              <input
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
              placeholder='Repeat Password'
              className='signupModal-Input'
              ></input>
            </div>
            <button type='submit' className='signupModal-Signup-Button'
            >Sign Up</button>
            {/* <button type='submit' className='signupModal-Signup-Button' 
            onClick={!errors.length ? props.onClose : null}
            >Sign Up</button> */}
          </form>
          <div>
            <img src={goodeatsSignupImg} alt='goodeatsSignupImg' className='goodeatssignupImg-Modal'></img>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpModal;