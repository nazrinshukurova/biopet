import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./Buttons.module.css";
import { Cart2 } from "../../assets/Svg";
import { useBasket } from "../../context/AddToBasket";
import { Link } from "react-router-dom";

const AddToCart = ({ onClick }) => {
  const { t, i18n } = useTranslation();
  const { addToBasket, showSuccessAlert } = useBasket();

  return (
    <div>
      <button onClick={onClick} className={styles.addToCart}>
        <p className={styles.addToCart_desc}>
          <Cart2 className={styles.cart} />{" "}
          {i18n.language === "az" ? "Səbətə at" : "В корзину"}
        </p>
      </button>

      {showSuccessAlert}
    </div>
  );
};

export default AddToCart;

export const ViewBasket = () => {
  const { i18n } = useTranslation();

  return (
    <>
      <Link style={{ textDecoration: "none" }} to="/basket">
        {" "}
        <div className={styles.view_basket}>
          {i18n.language === "az" ? "Səbətə keç" : "Перейти в корзину"}
        </div>
      </Link>
    </>
  );
};

// export const SameButton = () => {
//   const { i18n } = useTranslation();

//   return (
//     <div className={styles.finish_the_order}>
//       {i18n.language === "az" ? "Sifarişi tamamlayın" : "Завершить заказ"}
//     </div>
//   );
// };

export const FinishTheOrder = ({ text }) => {
  const { i18n } = useTranslation();

  return <div className={styles.finish_the_order}>{text}</div>;
};

export const ClearAll = ({ clickFunction }) => {
  const { t, i18n } = useTranslation();

  return (
    <div className={styles.clear_box} onClick={clickFunction}>
      {" "}
      <div className={styles.clear_all_button}>
        {" "}
        {i18n.language === "az" ? "Hamısını təmizlə" : "Очистить все"}
      </div>
    </div>
  );
};

export const SaveMemory = ({ disabled, onClick }) => {
  const { i18n } = useTranslation();

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={styles.save_memory}
    >
      {i18n.language === "az"
        ? "Yadda saxla və davam et"
        : "Сохранить и продолжить"}
    </button>
  );
};

export const PayButton = ({ color, text, textColor, type, onClick }) => {
  return (
    <>
      <button
        type={type}
        onClick={onClick}
        style={{ backgroundColor: color, color: textColor }}
        className={styles.pay}
      >
        {text}
      </button>
    </>
  );
};
