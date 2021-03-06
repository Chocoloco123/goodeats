import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import LoginForm from './components/auth/LoginForm';
// import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import MainRestaurants from './components/MainRestaurants'
import SingleRestaurant from './components/SingleRestaurant'
import AddRestaurantForm from './components/AddRestaurantForm'
import EditRestaurantForm from './components/EditRestaurantForm';
// import AddReviewForm from './components/AddReview'
import EditReviewForm from './components/EditReviewForm';
import About from './components/About'
import SearchedRestaurantPage from './components/Search/SearchPage';
import AllRestImages from './components/RestaurantImages/AllRestImages';
import AddImage from './components/RestaurantImages/AddRestImage';

// import RouteNotFound from './components/RouteNotFound';
// import Footer from './components/Footer';
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
        {/* <Route path='/login' exact={true}>
          <LoginForm />
        </Route> */}
        {/* <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route> */}
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
        <ProtectedRoute path='/restaurants/new_restaurant' exact={true}>
          <AddRestaurantForm />
        </ProtectedRoute>
        {/* <Route path='/restaurants/new_restaurant' exact={true}>
          <AddRestaurantForm />
        </Route> */}
        <ProtectedRoute path='/restaurants/:id/edit' exact={true}>
          <EditRestaurantForm />
        </ProtectedRoute>
        <Route path='/restaurants/:id' exact={true}>
          <SingleRestaurant />
        </Route>
        {/* <Route exact={true} path="/restaurants/:id/images/:restaurantId"> */}
        <Route exact={true} path="/images/:restaurantId">
          <AllRestImages />
        </Route>
        <Route path="/images/:restaurantId/newImage" exact={true}>
          <AddImage />
        </Route>
        <ProtectedRoute path='/restaurants/:id/reviews/:reviewId/edit' exact={true}>
          <EditReviewForm />
        </ProtectedRoute>
        <Route path="/About" >
          <About />
        </Route>
        <Route path="/search/:searched" exact={true}>
          <SearchedRestaurantPage />
        </Route>

        {/* <Route path='/reviews/:reviewId/edit' exact={true}>
          <EditReviewForm />
        </Route> */}
        {/* <Route path='/restaurants/:id/reviews/new' exact={true}>
        </Route> */}
        {/* <Route>
          <RouteNotFound />
        </Route> */}
        {/* <Route component={RouteNotFound} /> */}
      </Switch>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
