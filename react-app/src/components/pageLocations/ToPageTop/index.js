import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ToTop = () => {
  const route = useLocation();
  const goToTop = () => {
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    goToTop()
  }, [route])

  return null;
}


export default ToTop;
