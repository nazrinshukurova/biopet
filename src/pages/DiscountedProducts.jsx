import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import {
  Breadcrumbs,
  EmptyStarSvg,
  FullFilledStarSvg,
  Wish,
  Wished,
} from "../assets/icons/Svg.jsx";
import { useTranslation } from "react-i18next";
import styles from "../styles/Discounted.module.css";
import Footer from "../shared/Footer/Footer";
import AddToCart from "../shared/Buttons/Buttons";
import { useBasket } from "../context/AddToBasket";
import { useWishlist } from "../context/WishlistContext.jsx";
import { Breadcrumb } from "antd";

const DiscountedProducts = () => {
  const { products, loading } = useProducts();
  const [discountedProducts, setDiscountedProducts] = useState([]);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { addToBasket } = useBasket();
  const { isInWishlist, removeFromWishlist, addToWishlist } = useWishlist();

  useEffect(() => {
    if (products?.length) {
      const discounted = products.filter((prod) => prod?.isDiscount);
      setDiscountedProducts(discounted);
    }
  }, [products]);

  if (loading) {
    return (
      <div className={styles.filtered_result}>
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className={styles.filtered_item}>
            <div className={`${styles.item_image} ${styles.skeleton}`} />
            <div className={styles.item_desc}>
              <div className={`${styles.price} ${styles.skeleton}`} />
              <div className={`${styles.item_title} ${styles.skeleton}`} />
              <div className={`${styles.rating} ${styles.skeleton}`} />
              <div className={`${styles.item_package} ${styles.skeleton}`} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={styles.discounted_products_container}>
      {/* Breadcrumbs */}
      <div className={styles.breadcrumbs}>
        <Link to="/" className={styles.breadcrumb_link}>
          Biopet
        </Link>{" "}
        <Breadcrumbs />
        <span className={styles.breadcrumb_current}>
          {i18n.language === "az" ? "Endirimlər" : "Скидки"}
        </span>
      </div>

      {/* Product List */}
      <div className={styles.filtered_result}>
        {discountedProducts.length === 0 ? (
          <div className={styles.empty_message_box}>
            <p className={styles.empty_message}>
              {i18n.language === "az"
                ? "Nəticə tapılmadı"
                : "Ничего не найдено"}
            </p>
          </div>
        ) : (
          discountedProducts.map((item) => (
            <div key={item.id} className={styles.filtered_item}>
              <div
                style={{ position: "relative" }}
                className={styles.item_image}
              >
                {item.isDiscount && (
                  <div
                    style={{ position: "absolute", left: "10px", top: "10px" }}
                    className={styles.discount_box}
                  >
                    -{item.PercentOfDiscount}%
                  </div>
                )}
                <img
                  height="172px"
                  width="172px"
                  src={item.İmage}
                  alt={item.NameAz}
                />
              </div>

              <div
                style={{
                  cursor: "pointer",
                  position: "absolute",
                  right: "14px",
                  top: "17px",
                }}
                onClick={() =>
                  isInWishlist(item.id)
                    ? removeFromWishlist(item.id)
                    : addToWishlist(item)
                }
              >
                {isInWishlist(item.id) ? <Wished /> : <Wish />}
              </div>

              <div className={styles.item_desc}>
                <div className={styles.price_container}>
                  {item?.isDiscount ? (
                    <div className={styles.allOfPrices}>
                      <p
                        className={styles.prices}
                        style={{
                          textDecoration: "line-through",
                          fontSize: "18px",
                        }}
                      >
                        {item.Price.toFixed(2)} AZN
                      </p>
                      <p
                        style={{ color: "red" }}
                        className={styles.discounted_price}
                      >
                        {(
                          item.Price -
                          (item.Price / 100) * item.PercentOfDiscount
                        ).toFixed(2)}{" "}
                        AZN
                      </p>
                    </div>
                  ) : (
                    <p className={styles.prices}>{item.Price.toFixed(2)} AZN</p>
                  )}
                </div>

                <div
                  onClick={() =>
                    navigate(`/product/${item.id}`, {
                      state: { product: item },
                    })
                  }
                  className={styles.item_title}
                >
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

export default DiscountedProducts;
