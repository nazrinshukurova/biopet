import React from "react";
import { useProducts } from "../../context/ProductContext";
import { EmptyStarSvg, FullFilledStarSvg } from "../../assets/icons/Svg.jsx";
import { useNavigate } from "react-router-dom";
import AddToCart from "../Buttons/Buttons";
import styles from "./Suggestions.module.css";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useBasket } from "../../context/AddToBasket";

const Suggestions = () => {
  const { products, loading } = useProducts();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const { addToBasket } = useBasket();

  if (loading) return <div className="spinner"></div>;

  const bestSellers = products.filter((product) => product.BestSeller === true);

  if (bestSellers.length === 0) {
    return (
      <div className={styles.empty_message_box}>
        <p className={styles.empty_message}>
          {i18n.language === "az" ? "Nəticə tapılmadı" : "Ничего не найдено"}
        </p>
      </div>
    );
  }

  // Best sellerləri 5-li qruplara ayır
  const chunkedBestSellers = [];
  for (let i = 0; i < bestSellers.length; i += 5) {
    chunkedBestSellers.push(bestSellers.slice(i, i + 5));
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true,
    cssEase: "ease-in-out",
    arrows: false, // oxları gizlə
  };

  return (
    <div
      style={{
        padding: "50px 20px",
        overflowX: "hidden",
        backgroundColor: "var(--container-bg)",
      }}
    >
      <div className={styles.bestseller_title} style={{ marginBottom: "20px" }}>
        {i18n.language === "az"
          ? "Ən çox satılan məhsullar"
          : "Самые продаваемые продукты"}
      </div>
      <Slider {...sliderSettings}>
        {chunkedBestSellers.map((group, index) => (
          <div key={index}>
            <div className={styles.slider_group}>
              {group.map((item) => (
                <div key={item.id} className={styles.filtered_item}>
                  <div
                    style={{ position: "relative" }}
                    className={styles.item_image}
                  >
                    {item.isDiscount && (
                      <div className={styles.discount_box}>
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
                  <div className={styles.item_desc}>
                    <div className={styles.price_container}>
                      {item?.isDiscount ? (
                        <div className={styles.allOfPrices}>
                          <p
                            className={styles.prices}
                            style={{
                              textDecoration: "line-through",
                              fontSize: "16px",
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
                        <p className={styles.prices}>
                          {item.Price.toFixed(2)} AZN
                        </p>
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
                  <AddToCart onClick={() => addToBasket(item)} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Suggestions;
