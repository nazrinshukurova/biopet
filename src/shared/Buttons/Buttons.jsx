import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./Buttons.module.css";
import { Cart2 } from "../../assets/Svg";
import { useBasket } from "../../context/AddToBasket";

const AddToCart = ({ product }) => {
  const { t, i18n } = useTranslation();
  const { addToBasket } = useBasket();

  return (
    <div>
      <button onClick={() => addToBasket(product)} className={styles.addToCart}>
        <p className={styles.addToCart_desc}>
          <Cart2 className={styles.cart} />{" "}
          {i18n.language === "az" ? "Səbətə at" : "В корзину"}
        </p>
      </button>
    </div>
  );
};

export default AddToCart;

export const ViewBasket = () => {
  const { i18n } = useTranslation();

  return (
    <div className={styles.view_basket}>
      {i18n.language === "az" ? "Səbətə keç" : "Перейти в корзину"}
    </div>
  );
};

export const SameButton = () => {
  const { i18n } = useTranslation();

  return (
    <div className={styles.same_button}>
      {i18n.language === "az" ? "Səbətə keç" : "Перейти в корзину"}
    </div>
  );
};

export const FinishTheOrder = () => {
  const { i18n } = useTranslation();

  return (
    <div className={styles.finish_the_order}>
      {i18n.language === "az" ? "Sifarişi tamamlayın" : "Завершить заказ"}
    </div>
  );
};
