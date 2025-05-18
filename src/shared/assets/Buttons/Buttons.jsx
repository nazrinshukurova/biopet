import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./Buttons.module.css";
import { Cart2 } from "../../../assets/Svg";

export const AddToCart = () => {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <button className={styles.addToCart}>
        <p className={styles.addToCart_desc}>
          <Cart2 className={styles.cart} />{" "}
          {i18n.language === "az" ? "Səbətə at" : "В корзину"}
        </p>
      </button>
    </div>
  );
};
