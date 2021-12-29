# Goodeats

Live site: [Goodeats](https://goodeatsapp.herokuapp.com/)

Database Schema: [Goodeats Database Schema](https://github.com/Chocoloco123/goodeats/wiki/Database-Schema)

Goodeats is a Yelp clone meant for foodies to share insights on their favorite restaurants. Users can create restaurants and add reviews to to a community of food lovers around the world.

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
 You are able to dynamically render overall star ratings and reviews of all the reviews for a particular restaurant.
 
## 
