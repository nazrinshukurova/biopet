import React from "react";
import styles from "./SmallGroups.module.css";
import { useTranslation } from "react-i18next";

const SmallGroups = ({title,src}) => {

  return (
    <div className={styles.group_item}>
      <span className={styles.title}>{title}</span>
      <img className={styles.group_img} src={src}></img>
    </div>
  );
};

export default SmallGroups;
