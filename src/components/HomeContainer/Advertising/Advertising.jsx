import React from "react";
import styles from "./Advertising.module.css";
import { useTranslation } from "react-i18next";

const Advertising = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.advertises}>
      <div className={styles.image_container}>
        <img
          className={styles.advertise_img}
          src={t("advertising.advertise1")}
        ></img>
      </div>
      <div className={styles.image_container}>
        <img
          className={styles.advertise_img}
          src={t("advertising.advertise2")}
        ></img>
      </div>
    </div>
  );
};

export default Advertising;
