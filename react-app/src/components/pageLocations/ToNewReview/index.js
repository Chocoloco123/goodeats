import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ToNewReview = () => {
  const route = useLocation();
  const goToNewRev = () => {
    window.scrollTo(0, document.body.scrollHeight)
  }

  useEffect(() => {
    goToNewRev()
  }, [route])

  return null;
}


export default ToNewReview;
