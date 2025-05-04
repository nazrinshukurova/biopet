import React from "react";
import styles from "./CategoriesItem.module.css";
import image1 from "../../../assets/images/home/categoriesİtem/image-208.png";

const CategoriesItem = () => {
  return (
    <div className={styles.categories_item}>
      <div className={styles.box}>
        <span className={styles.header}>İt üçün məhsullar</span>
      </div>
      <img className={styles.image1} src={image1} alt="dog" />
    </div>
  );
};

export default CategoriesItem;
