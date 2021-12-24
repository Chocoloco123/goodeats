import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import MainRestaurants from './components/MainRestaurants'
import SingleRestaurant from './components/SingleRestaurant'
import AddRestaurantForm from './components/AddRestaurantForm'
import EditRestaurantForm from './components/EditRestaurantForm';
import AddReviewForm from './components/AddReview'
import EditReviewForm from './components/EditReviewForm';
import { authenticate } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        {/* <ProtectedRoute path='/' exact={true} >
          <h1>My Home Page</h1>
        </ProtectedRoute> */}
        <Route path='/' exact={true} >
          <MainRestaurants />
        </Route>
        <Route path='/restaurants/new_restaurant' exact={true}>
          <AddRestaurantForm />
        </Route>
        <Route path='/restaurants/:id/edit' exact={true}>
          <EditRestaurantForm />
        </Route>
        <Route path='/restaurants/:id' exact={true}>
          <SingleRestaurant />
        </Route>
        <Route path='/reviews/:reviewId/edit' exact={true}>
          <EditReviewForm />
        </Route>
        {/* <Route path='/restaurants/:id/reviews/new' exact={true}>
        </Route> */}

      </Switch>
    </BrowserRouter>
  );
}

export default App;
