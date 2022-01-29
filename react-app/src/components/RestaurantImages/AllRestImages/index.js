import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { getRestImages } from "../../../store/images";

// import './AllRestImages.css';

const AllRestImages = ({restaurantId}) => {
  // const dispatch = useDispatch();
  const images = useSelector((state) => state?.image)

  return (
    <>Hello World</>
  )
}

export default AllRestImages;