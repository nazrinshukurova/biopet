import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import slider1 from "../../../assets/images/home/slider2/elanco-advantage-multi-1000x1000.jpg";
import styles from "./Banner.module.css";
import { LuShoppingCart } from "react-icons/lu";
import { useTranslation } from "react-i18next";

const Banner = () => {
  const { t, i18n } = useTranslation();
  const [selectedLang, setSelectedLang] = useState("az");

  const changeLang = (myLang) => {
    i18n.changeLanguage(myLang);
    setSelectedLang(myLang);
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className={styles.carousels}>
      <div className={styles.carousel}>
        <Carousel
          swipeable={false}
          draggable={false}
          showDots={true}
          responsive={responsive}
          ssr={true}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={3000}
          keyBoardControl={true}
          customTransition="transform 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
          transitionDuration={900}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          <div>
            <img src={t("slider1.firstImage")} alt="Banner 1" />
          </div>
          <div>
            <img src={t("slider1.secondImage")} alt="Banner 2" />
          </div>
          <div>
            <img src={t("slider1.thirdImage")} alt="Banner 3" />
          </div>
          <div>
            <img src={t("slider1.fourthImage")} alt="Banner 4" />
          </div>
          <div>
            <img src={t("slider1.fifthImage")} alt="Banner 5" />
          </div>
          <div>
            <img src={t("slider1.sixthImage")} alt="Banner 6" />
          </div>
        </Carousel>
      </div>
      {/* Weekly Discount Carousel */}
      <div className={styles.weeklyDiscount}>
        <div className={styles.header}>
          <p>Həftənin endirimi</p>
          <div className={styles.countdown}>
            <div className={styles.count_container}>
              {" "}
              <div className={styles.count}>
                <div className={styles.time}>04</div>
                <div className={styles.two_dots}>:</div>
              </div>
              <div className={styles.timer}>Gün</div>
            </div>
            <div className={styles.count_container}>
              {" "}
              <div className={styles.count}>
                <div className={styles.time}>01</div>
                <div className={styles.two_dots}>:</div>
              </div>
              <div className={styles.timer}>Saat</div>
            </div>

            <div className={styles.count_container}>
              <div className={styles.count}>
                <div className={styles.time}>59</div>
                <div className={styles.two_dots}>:</div>
              </div>
              <div className={styles.timer}>Dəqiqə</div>
            </div>

            <div className={styles.count_container}>
              {" "}
              <div className={styles.count}>
                <div className={styles.time}>38</div>
              </div>
              <div className={styles.timer}>Saniyə</div>
            </div>
          </div>
        </div>

        <Carousel responsive={responsive} arrows={true} infinite={true}>
          <div className={styles.productCard}>
            <div className={styles.discountBadge}>21%</div>
            <div className={styles.img_container}>
              <img
                className={styles.slider_1_image}
                src={slider1}
                alt="Elanco Advantage Multi"
                style={{ height: "172px", width: "170px" }}
              />
            </div>

            <div className={styles.productInfo}>
              <p className={styles.productName}>
                Elanco Advantage Multi İt üçün birə, qoturluq gənəsi və
                helmintlərə qarşı damcı (25-40 kq)
              </p>
              <div className={styles.productPricingContainer}>
                <div className={styles.productPricing}>
                  <span className={styles.discountedPrice}>28 ₼</span>
                  <span className={styles.originalPrice}>35.5 ₼</span>
                </div>
                <button className={styles.addToCart}>
                  <LuShoppingCart style={{ fontSize: "20px" }} />
                </button>
              </div>
            </div>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default Banner;
