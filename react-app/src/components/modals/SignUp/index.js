import { React, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { signUp } from '../../../store/session';
import goodeatsLogoWhite from '../../../media/goodeats_transparent_white.png'
import goodeatsSignupImg from '../../../media/signup_image.png'
import './SignUpModal.css'

function SignUpModal(props) {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));

      if (data) {
        setErrors(data)
      }
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
        <div className='signupModal-Header'>
          <img src={goodeatsLogoWhite} alt='goodeatsLogo' className='goodeatsLogo-Modal'></img>
          {/* <h4 className='signupModal-Title'>Sign Up</h4> */}
        </div>
        <div className='signupModal-Body'>
          <form onSubmit={onSignUp}>
            <div>
              {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
              ))}
            </div>
            <div className='signupModal-SignupTitle-Div'>
              <label className='signupModal-Title'>Sign up for Goodeats</label>
            </div>
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
            <button type='submit' className='signupModal-Signup-Button'>Sign Up</button>
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