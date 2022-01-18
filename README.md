# Goodeats

Live site: [Goodeats](https://goodeatsapp.herokuapp.com/)

Goodeats Wiki Page: [Goodeats Wiki](https://github.com/Chocoloco123/goodeats/wiki)

Database Schema: [Goodeats Database Schema](https://github.com/Chocoloco123/goodeats/wiki/Database-Schema)

Goodeats is a Yelp clone meant for foodies to share insights on their favorite restaurants. Users can create restaurants and add reviews to a community of food lovers around the world.

![GoodeatsLanding](https://res.cloudinary.com/dsz4sha80/image/upload/v1640796851/Screen_Shot_2021-12-29_at_8.48.20_AM_hqysif.png)

## Dynamically Rendered Ratings
  ```
  let overallRating = 0;
  let sumRating = 0;
  let numReviews = reviewsArr.length;

  reviewsArr.map((revObj) =>
    sumRating += revObj.rating,
  )
  overallRating = Math.round(sumRating / reviewsArr.length)
 ```
 ```
 {overallRating ?
  Array(overallRating)?.fill(
  <span className='reviewStarSpanStyle'>
     <i className="fas fa-star reviewStarStyle"></i>
  </span>)?.map((el, idx) => 
     <span key={`${idx}-inner`}>{el}</span>) : null}
 ```
One of the fun aspects about this project was being able to work on dynamically rendering ratings and the review count. You are able to dynamically render overall star ratings and reviews of all the reviews for a particular restaurant. The number of reviews is summed while the star rating is an average of all of the ratings rounded up.

![Page Ratings](https://res.cloudinary.com/dsz4sha80/image/upload/v1640796856/Screen_Shot_2021-12-29_at_8.48.53_AM_bjllaa.png)

Another fun yet tricky aspect of this app was figuring out how to open and close the modals upon signup/login. I was able to implement a useState that was set to a boolean value in my NavBar component, then pass it in as props to my Signup and Login modals. It was very fun learning how to use the modal and how to create a greater user experience. 

![Rating Gif](https://res.cloudinary.com/dsz4sha80/image/upload/v1641344057/Goodeats_Rating_Clip_Lg_yab1hv.gif)

```
NavBar component

  { 
      (!sessionUser?.username || !sessionUser) ?
        (signupModal && (
          <SignUpModal
            show={signupModal} 
            onClose={() => setSignupModal(false)
            }
          />
          )) : null
      }
      { 
      (!sessionUser?.username || !sessionUser) ?
        (loginModal && (
          <LoginModal
            showLogin={loginModal} 
            onClose={() => setLoginModal(false)} 
          />
        ))
        : null
   }
```
![Login Modal](https://res.cloudinary.com/dsz4sha80/image/upload/v1640806789/Screen_Shot_2021-12-29_at_11.39.42_AM_k8c0id.png)

## Setup
### Install
  * Download app copy [here](https://github.com/Chocoloco123/goodeats)
  * Open up two consoles:
      * Backend: In the main project directory
        * Install Dependencies: 
          ```
          pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
          ```
          Once dependencies installed, run:
            ```
            pipenv shell
            flask run
            ```
          * After adding any new dependencies, be sure to run:
            ```
            pipenv lock -r > requirements.txt
            ```
      * Frontend: In the react-app directory
        * Install Dependencies:  
          ```
          npm install
          ```
          Once dependencies installed, run: 
            ```
            npm start
            ```
### Local Database Setup Commands
* pipenv shell
* flask seed undo
* flask db downgrade
* flask db migrate
* flask db upgrade
* flask seed all

## Languages Used
* Javascript
* Python

## Technologies
* React
* Redux
* Flax
* SQLalchemy
* postgreSQL
* Docker
* Heroku

## Future Features
* Searchbar
* Add review images
* AWS
* Map
