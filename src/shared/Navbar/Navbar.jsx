import React, { useState } from "react";
import styles from "./Navbar.module.css";
import logo from "../../assets/svg/biopet_blue_logo.svg";
import phone from "../../assets/svg/876-black.svg";
import search from "../../assets/svg/search.svg";
import azFlag from "../../assets/svg/az.svg";
import ruFlag from "../../assets/svg/ru.svg";
import { FiUser } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [selectedLang, setSelectedLang] = useState(i18n.language);

  const changeLang = (myLang) => {
    i18n.changeLanguage(myLang);
    setSelectedLang(myLang);
  };

  return (
    <>
      <div className={styles.common_navbar_container}>
        <nav className={styles.nav_container}>
          <img className={styles.logo} src={logo} alt="logo" />
          <img className={styles.phone} src={phone} alt="phone" />

          <div className={styles.search_container}>
            <span>
              <img width="16" height="16" src={search} alt="search icon" />
            </span>
            <input
              className={styles.search_input}
              type="text"
              placeholder={t("navbar.searchPlaceholder")}
            />
          </div>

          <div className={styles.language_box}>
            <div className={styles.selected_language}>
              <div className={styles.az_flag_and_name}>
                <img
                  width="30"
                  height="20"
                  src={selectedLang === "az" ? azFlag : ruFlag}
                  alt="flag"
                />
                <span>{selectedLang === "az" ? "Az" : "Ru"}</span>
              </div>
              <IoIosArrowDown
                style={{
                  fontWeight: "400",
                  color: "#1d2123",
                }}
              />
            </div>

            <div
              className={styles.selected_language_2}
              onClick={() => changeLang(selectedLang === "az" ? "ru" : "az")}
            >
              <div className={styles.ru_flag_and_name}>
                <img
                  width="30"
                  height="20"
                  src={selectedLang === "az" ? ruFlag : azFlag}
                  alt="alt flag"
                />
                <span>{selectedLang === "az" ? "Ru" : "Az"}</span>
              </div>
            </div>
          </div>

          <div className={styles.header}>
            <FiUser className={styles.user} />
            <div className={styles.wish_and_count}>
              <FaRegHeart className={styles.heart} />
              <div className={styles.wishlist_count}>
                <span>0</span>
              </div>
            </div>
            <div className={styles.wish_and_count}>
              <LuShoppingCart className={styles.shopping_cart} />
              <div className={styles.wishlist_count}>
                <span>0</span>
              </div>
            </div>
          </div>
        </nav>

        <div className={styles.navbar_down_part}>
          <ul>
            <li>{t("navbarLinks.Pişiklər")}</li>
            <li>
              <Link
                to={`/${i18n.language}/products`}
                style={{ textDecoration: "none", color: "#1d2123" }}
              >
                {t("navbarLinks.Məhsullar")}
              </Link>
            </li>
            <li>{t("navbarLinks.Digər heyvanlar")}</li>
            <li>{t("navbarLinks.Brendlər")}</li>
            <li>{t("navbarLinks.Bloqlar")}</li>
            <li>{t("navbarLinks.FAQ")}</li>
            <li>{t("navbarLinks.Endirimlər")}</li>
            <li>{t("navbarLinks.Bonus mağaza")}</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
