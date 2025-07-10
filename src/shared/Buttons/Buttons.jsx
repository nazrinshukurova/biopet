import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./Buttons.module.css";
import { Cart2 } from "../../assets/icons/Svg";
import { useBasket } from "../../context/AddToBasket";
import { Link } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";

const AddToCart = ({ onClick, item }) => {
  const { t, i18n } = useTranslation();
  const { showSuccessAlert } = useBasket();

  return (
    <div>
      <button
        onClick={onClick}
        disabled={!item?.InStock}
        className={`${styles.addToCart} ${
          !item?.InStock ? styles.disabled : ""
        }`}
      >
        <p className={styles.addToCart_desc}>
          {item.InStock && <Cart2 className={styles.cart} />}
          {!item.InStock
            ? i18n.language === "az"
              ? "Tükənib"
              : "Распроданный"
            : i18n.language === "az"
            ? "Səbətə at"
            : "В корзину"}{" "}
        </p>
      </button>

      {/* Əgər bu alert JSX komponentidirsə, onu belə göstərmək olar: */}
      {showSuccessAlert && <div>{showSuccessAlert}</div>}
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

export const FinishTheOrder = ({ text, disabled }) => {
  const { i18n } = useTranslation();

  return (
    <button disabled={disabled} className={styles.finish_the_order}>
      {text}
    </button>
  );
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
