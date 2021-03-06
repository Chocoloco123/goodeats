import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Redirect } from 'react-router-dom';
import * as sessionActions from '../../store/session';
// import { login } from '../../store/session';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogin = async (e) => {
    e.preventDefault();
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

  const handleCancel = () => {
    history.push('/')
  }

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onLogin}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label htmlFor='email'>Email</label>
        <input
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div>
        <label htmlFor='password'>Password</label>
        <input
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
        />
        <button type='submit'>Login</button>
        <button type='submit' onClick={()=>{handleCancel()}}>Cancel</button>
        <button onClick={demoLogin} type="submit">Demo</button>
      </div>
    </form>
  );
};

export default LoginForm;
