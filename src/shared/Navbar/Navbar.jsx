import React, { useState, useEffect, useRef } from "react";
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

const Navbar = ({ lang }) => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const changeLang = (myLang) => {
    i18n.changeLanguage(myLang);
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  // Bağlama funksiyası (çöldə klik ediləndə dropdown bağlansın)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
                  src={lang === "az" ? azFlag : ruFlag}
                  alt="flag"
                />
                <span>{lang === "az" ? "Az" : "Ru"}</span>
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
              onClick={() => changeLang(lang === "az" ? "ru" : "az")}
            >
              <div className={styles.ru_flag_and_name}>
                <img
                  width="30"
                  height="20"
                  src={lang === "az" ? ruFlag : azFlag}
                  alt="alt flag"
                />
                <span>{lang === "az" ? "Ru" : "Az"}</span>
              </div>
            </div>
          </div>

          <div className={styles.header}>
            <div onClick={handleClick} ref={dropdownRef}>
              <FiUser className={styles.user} />
              {isOpen && (
                <div className={styles.user_dropdown}>
                  <ul>
                    <li>
                      <Link to="/login">{t("navbar.login")}</Link>
                    </li>
                    <li>
                      <Link to="/register">{t("navbar.register")}</Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
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
            <li className={styles.mehsullar}>
              <Link
                to={`/products`}
                style={{ textDecoration: "none", color: "#1d2123" }}
              >
                {t("navbarLinks.Məhsullar")}
              </Link>
            </li>
            <li>{t("navbarLinks.Digər heyvanlar")}</li>
            <li>{t("navbarLinks.Brendlər")}</li>
            <li>
              <Link
                to={`/blogs`}
                style={{ textDecoration: "none", color: "#1d2123" }}
              >
                {t("navbarLinks.Bloqlar")}
              </Link>
            </li>
            <li>
              <Link
                to={`/faq`}
                style={{ textDecoration: "none", color: "#1d2123" }}
              >
                {t("navbarLinks.FAQ")}
              </Link>
            </li>
            <li>
              <Link
                to={`/products/discounted_products`}
                style={{ textDecoration: "none", color: "#1d2123" }}
              >
                {t("navbarLinks.Endirimlər")}
              </Link>
            </li>
            <li>{t("navbarLinks.Bonus mağaza")}</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
