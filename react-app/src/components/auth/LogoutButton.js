import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const sessionUser = useSelector((state) => state.session.user);
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return (
    <div>
      {sessionUser ? 
        <button onClick={onLogout}>Logout</button> : null
    }
    </div>
  )
};

export default LogoutButton;
