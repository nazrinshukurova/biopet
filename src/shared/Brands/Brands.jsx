import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from "./Brands.module.css";
import leftArrow from "../../assets/svg/arrow-left.svg";
import rightArrow from "../../assets/svg/arrow-right.svg";

import brand1 from "../../assets/Brands/beeztees.jpg";
import brand2 from "../../assets/Brands/rectangle-2566.png";
import brand3 from "../../assets/Brands/monge-logo.jpg";
import brand4 from "../../assets/Brands/stefanplast.jpg";
import brand5 from "../../assets/Brands/flexi-130x100-1.jpg";
import brand6 from "../../assets/Brands/newproplan.jpg";
import brand7 from "../../assets/Brands/sanicat-130x100.jpg";
import brand8 from "../../assets/Brands/schesir.jpg";
import brand9 from "../../assets/Brands/collar-130x100.jpg";
import brand10 from "../../assets/Brands/jungle-logo.png";
import { useTranslation } from "react-i18next";

const brands = [
  { name: "Beeztees", image: brand1 },
  { name: "Royal Canin", image: brand2 },
  { name: "Monge", image: brand3 },
  { name: "Pro Plan", image: brand4 },
  { name: "Flexi", image: brand5 },
  { name: "Pro Plan 2", image: brand6 },
  { name: "Sanicat", image: brand7 },
  { name: "Schesir", image: brand8 },
  { name: "Collar", image: brand9 },
  { name: "Jungle", image: brand10 },
];

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 7,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 2,
  },

    mini_mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 1,
  },
};

const CustomLeftArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    style={{
      background: "transparent",
      border: "none",
      position: "absolute",
      top: "40%",
      left: "20px",
      zIndex: 2,
      cursor: "pointer",
      padding: 0,
      marginRight: "30px",
    }}
  >
    <img src={leftArrow} alt="left arrow" style={{ width: 27, height: 27 }} />
  </button>
);

const CustomRightArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    style={{
      background: "transparent",
      border: "none",
      position: "absolute",
      top: "40%",
      right: 0,
      zIndex: 9999,
      cursor: "pointer",
      padding: 0,
    }}
  >
    <img src={rightArrow} alt="right arrow" style={{ width: 27, height: 27 }} />
  </button>
);

const BrandSlider = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.sliderContainer}>
      <p style={{ color: "var(--textColor)" }}>{t("brands.brands")}</p>
      <p style={{ color: "var(--textColor)" }}>{t("brands.brands_title")}</p>

      <Carousel
        className={styles.carousel}
        responsive={responsive}
        infinite
        arrows={false}
        autoPlay
        autoPlaySpeed={3000}
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
      >
        {brands.map((brand, index) => (
          <div key={index} className={styles.brandCard}>
            <img
              src={brand.image}
              alt={brand.name}
              className={styles.brandImage}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default BrandSlider;
