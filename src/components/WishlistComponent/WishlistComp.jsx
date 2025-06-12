import React from "react";
import styles from "./Wishlist.module.css";
import {
  BigHeart,
  Delete,
  EmptyStarSvg,
  FullFilledStarSvg,
  Wished,
} from "../../assets/Svg";
import AddToCart, { ClearAll } from "../../shared/Buttons/Buttons";
import { useWishlist } from "../../context/WishlistContext";
import { useTranslation } from "react-i18next";
import { FiHeart } from "react-icons/fi";

const WishlistComp = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { i18n } = useTranslation();

  return (
    <div>
      <div className={styles.clear_and_wishlist}>
        {" "}
        <h1 className={styles.title}>
          {i18n.language === "az" ? "İstək listim" : "Избранное"}
        </h1>
        {wishlist.length !== 0 ? (
          <ClearAll clickFunction={clearWishlist} />
        ) : null}
      </div>
      <div className={styles.filtered_result}>
        {wishlist.length === 0 ? (
          <div className={styles.empty_message_box}>
            <div className={styles.heart}>
              {" "}
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
              <div
                style={{ position: "relative", cursor: "pointer" }}
                className={styles.item_image}
              >
                {item.isDiscount && (
                  <div
                    style={{
                      position: "absolute",
                      left: "10px",
                      top: "10px",
                    }}
                    className={styles.discount_box}
                  >
                    -{item.PercentOfDiscount}%
                  </div>
                )}

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    position: "absolute",
                    right: "10px",
                    top: "10px",
                  }}
                >
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    <Delete />{" "}
                    {/* İstəyirsənsə başqa bir "Remove" ikonu da qoya bilərsən */}
                  </div>
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

              <AddToCart product={item} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WishlistComp;
