import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { searchForRestaurant } from "../../../store/search"
import {useParams} from 'react-router-dom'
import SingleRestaurantCard from "../../SingleRestaurantCard";
import './SearchPage.css'

const SearchedRestaurantPage = () => {
  const searchData = useSelector((state) => state?.searchRes)
  const dispatch = useDispatch();

  const { searched } = useParams();
  useEffect(() => {
    dispatch(searchForRestaurant(searched))
  }, [dispatch, searched])


  if (!searchData?.restaurants) {
    return null;
  }

  const restaurants = Object.values(searchData?.restaurants);
  
  if (!restaurants.length) {
    return (<h1>No Products found for "{searched}"</h1>)
  } else {
    return (
      <div className="searchResults-Content">
        <div className="SearchTitleDiv"><h1 className="searchResTitle">Search Results For "{searched}"</h1></div>
        <div className="restaurantCardInd">
          {restaurants.length > 0 ?
            restaurants?.map(({
              id, name, city, state,  stars, review_count, categoryId, imageUrl
            }
          )=> 
            <SingleRestaurantCard
              key={id}
              id={id}
              imageUrl={imageUrl}
              name={name}
              stars={stars}
              review_count={review_count}
              categoryId={categoryId}
              city={city}
              state={state}
            />) : null
          }
        </div>
      </div>
    )
  }
}

export default SearchedRestaurantPage;