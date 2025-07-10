import React, { useEffect } from "react";
import styles from "./ScrollToTop.module.css";
import { Paw } from "../../assets/icons/Svg";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div onClick={handleClick} className={styles.scroll_container}>
      <Paw />
    </div>
  );
};

export default ScrollToTop;
