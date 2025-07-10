import React, { useState, useEffect, useCallback } from "react";
import styles from "./Dropdown.module.css";
import logo from "../../assets/svg/biopet_blue_logo.svg";
import close from "../../assets/svg/close.svg";
import { useTranslation } from "react-i18next";
import arrow from "../../assets/svg/arrow-right.svg";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

const Dropdown = ({ visibility, setVisibility }) => {
  const { t, i18n } = useTranslation();
  const [selectedLang, setSelectedLang] = useState(i18n.language);

  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);

  useEffect(() => {
    setSelectedLang(i18n.language);
  }, [i18n.language]);

  const changeLang = useCallback(
    (myLang) => {
      i18n.changeLanguage(myLang);
    },
    [i18n]
  );

  const closeDropdownMenu = () => {
    setVisibility(false);
  };

  return visibility ? (
    <div className={styles.dropdown} data-aos="fade-right">
      <div className={styles.logo_container}>
        <img src={logo} className={styles.logo} alt="logo" />
        <div onClick={closeDropdownMenu} style={{ cursor: "pointer" }}>
          <img src={close} alt="close" />
        </div>
      </div>

      <div className={styles.navbar_scroll}>
        <div className={styles.link_container}>
          <Link className={styles.link} to="/products">
            {t("navbarLinks.Məhsullar")}
          </Link>
          <img className={styles.arrow} src={arrow} alt="arrow" />
        </div>

        <div className={styles.link_container}>
          <Link className={styles.link} to="/blogs">
            {t("navbarLinks.Bloqlar")}
          </Link>
          <img className={styles.arrow} src={arrow} alt="arrow" />
        </div>

        <div className={styles.link_container}>
          <Link className={styles.link} to="/faq">
            {t("navbarLinks.FAQ")}
          </Link>
          <img className={styles.arrow} src={arrow} alt="arrow" />
        </div>

        <div className={styles.link_container}>
          <Link className={styles.link} to="/products/discounted_products">
            {t("navbarLinks.Endirimlər")}
          </Link>
          <img className={styles.arrow} src={arrow} alt="arrow" />
        </div>

        <div className={styles.link_container}>
          <Link className={styles.link} to="/about">
            {t("about_title")}
          </Link>
          <img className={styles.arrow} src={arrow} alt="arrow" />
        </div>

        <div className={styles.link_container}>
          <Link className={styles.link} to="/contact">
            {t("contact_title")}
          </Link>
          <img className={styles.arrow} src={arrow} alt="arrow" />
        </div>
      </div>

      <div className={styles.language_container}>
        <div
          onClick={() => changeLang("ru")}
          className={`${styles.language} ${
            selectedLang !== "ru" ? styles.inactive : ""
          }`}
        >
          Ru
        </div>
        <div
          onClick={() => changeLang("az")}
          className={`${styles.language} ${
            selectedLang !== "az" ? styles.inactive : ""
          }`}
        >
          Az
        </div>
      </div>

      <div className={styles.header__nav__btns}>
        <Link to="/login">
          {" "}
          <div className={styles.login}>{t("buttons.login")}</div>
        </Link>
        <Link style={{textDecoration:"none"}} to="/register">
          {" "}
          <div className={styles.register}>{t("buttons.register")}</div>
        </Link>
      </div>
    </div>
  ) : null;
};

export default Dropdown;
