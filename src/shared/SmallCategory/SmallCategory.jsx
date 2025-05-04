import React from "react";
import styles from "./SmallCategory.module.css";

const SmallCategory = ({src,title}) => {
  return (
    <div className={styles.category}>
    <span className={styles.category_title}>{title}</span>
      <img className={styles.category_image} src={src}></img>
    </div>
  );
};

export default SmallCategory;
