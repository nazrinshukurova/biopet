import React from "react";
import styles from "./Wishlist.module.css";
import {
  BigHeart,
  Delete,
  EmptyStarSvg,
  FullFilledStarSvg,
} from "../../assets/icons/Svg.jsx";
import AddToCart, { ClearAll } from "../../shared/Buttons/Buttons";
import { useWishlist } from "../../context/WishlistContext";
import { useTranslation } from "react-i18next";
import { useBasket } from "../../context/AddToBasket";

const WishlistComp = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { i18n } = useTranslation();
  const { addToBasket } = useBasket();

  return (
    <div className={styles.wishlist_wrapper}>
      <h1 className={styles.title}>
        {i18n.language === "az" ? "İstək listim" : "Избранное"}
      </h1>

      {wishlist.length !== 0 && (
        <div className={styles.clear_and_wishlist}>
          <div className={styles.clear_all_button_div}>
            <ClearAll clickFunction={clearWishlist} />
          </div>
        </div>
      )}

      <div className={styles.filtered_result}>
        {wishlist.length === 0 ? (
          <div className={styles.empty_message_box}>
            <div className={styles.heart}>
              <BigHeart />
            </div>
            <p className={styles.empty_message}>
              {i18n.language === "az"
                ? "Wishlist boşdur"
                : "Список желаний пуст"}
            </p>
          </div>
        ) : (
          wishlist.map((item) => (
            <div key={item.id} className={styles.filtered_item}>
              <div className={styles.item_image}>
                {item.isDiscount && (
                  <div className={styles.discount_box}>
                    -{item.PercentOfDiscount}%
                  </div>
                )}

                <div
                  className={styles.delete_icon}
                  onClick={() => removeFromWishlist(item.id)}
                >
                  <Delete />
                </div>

                <img
                  height="172px"
                  width="172px"
                  src={item.İmage}
                  alt={item.NameAz}
                />
              </div>

              <div className={styles.item_desc}>
                <div className={styles.priceForFilter}>{item.Price} AZN</div>
                <div className={styles.item_title}>
                  {i18n.language === "az" ? item.NameAz : item.NameRu}
                </div>
                <div className={styles.rating}>
                  {item?.Rating === 0 ? (
                    <EmptyStarSvg />
                  ) : (
                    <FullFilledStarSvg />
                  )}
                  {item.Rating}
                </div>
                {item.Package && (
                  <div className={styles.item_package}>
                    {i18n.language === "az"
                      ? `${item.Package}q`
                      : `${item.Package}г`}
                  </div>
                )}
              </div>

              <AddToCart item={item} onClick={() => addToBasket(item)} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WishlistComp;
