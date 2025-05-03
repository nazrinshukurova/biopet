import React, { useState, useEffect, useCallback } from "react";
import styles from "./Dropdown.module.css";
import logo from "../../assets/svg/biopet_blue_logo.svg";
import close from "../../assets/svg/close.svg";
import { useTranslation } from "react-i18next";
import arrow from "../../assets/svg/arrow-right.svg";
import AOS from "aos";
import "aos/dist/aos.css";

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
          <div className={styles.link}>{t("navbarLinks.Pişiklər")}</div>
          <img className={styles.arrow} src={arrow} alt="arrow" />
        </div>
        <div className={styles.link_container}>
          <div className={styles.link}>{t("navbarLinks.İtlər")}</div>
          <img className={styles.arrow} src={arrow} alt="arrow" />
        </div>
        <div className={styles.link_container}>
          <div className={styles.link}>{t("navbarLinks.Digər heyvanlar")}</div>
          <img className={styles.arrow} src={arrow} alt="arrow" />
        </div>
        <div className={styles.link_container}>
          <div className={styles.link}>{t("navbarLinks.Brendlər")}</div>
          <img className={styles.arrow} src={arrow} alt="arrow" />
        </div>
        <div className={styles.link_container}>
          <div className={styles.link}>{t("navbarLinks.Bloqlar")}</div>
          <img className={styles.arrow} src={arrow} alt="arrow" />
        </div>
        <div className={styles.link_container}>
          <div className={styles.link}>{t("navbarLinks.FAQ")}</div>
          <img className={styles.arrow} src={arrow} alt="arrow" />
        </div>
        <div className={styles.link_container}>
          <div className={styles.link}>{t("navbarLinks.Endirimlər")}</div>
          <img className={styles.arrow} src={arrow} alt="arrow" />
        </div>
        <div className={styles.link_container}>
          <div className={styles.link}>{t("navbarLinks.Bonus mağaza")}</div>
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
        <div className={styles.login}>{t("buttons.login")}</div>
        <div className={styles.register}>{t("buttons.register")}</div>
      </div>
    </div>
  ) : null;
};

export default Dropdown;
