import React, { useState } from "react";
import styles from "./NavbarMobile.module.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiUser } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import logo from "../../assets/svg/biopet_blue_logo.svg";
import search from "../../assets/svg/search.svg";
import azFlag from "../../assets/svg/az.svg";
import ruFlag from "../../assets/svg/ru.svg";

import { useBasket } from "../../context/AddToBasket";
import { useWishlist } from "../../context/WishlistContext";
import { useTheme } from "../../context/ThemeContext";
import { useProducts } from "../../context/ProductContext";
import { DarkMode, LightMode } from "../../assets/icons/Svg.jsx";

import Dropdown from "../Dropdown/Dropdown";
import SearchResults from "../../components/SearchResults/SearchResults";

const NavbarMobile = () => {
  const { t, i18n } = useTranslation();
  const [visibility, setVisibility] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const { basketItems, totalQuantity } = useBasket();
  const { wishlist } = useWishlist();
  const { theme, toggleTheme } = useTheme();
  const { searchTerm, setSearchTerm } = useProducts();

  const toggleDropdownMenu = () => setVisibility(true);

  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
    setIsLangOpen(false);
  };

  return (
    <>
      <div className={styles.navbar_mobile_container}>
        <div>
          <GiHamburgerMenu
            className={styles.burger_menu}
            onClick={toggleDropdownMenu}
          />
        </div>
        <div className={styles.logo_container}>
          <Link to="/">
            <img className={styles.logo} src={logo} alt="logo" />
          </Link>
        </div>

        <div className={styles.search_container}>
          <input
            className={styles.search_input}
            type="text"
            placeholder={t("navbar.searchPlaceholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span>
            <img width="16" height="16" src={search} alt="search icon" />
          </span>
          {searchTerm.trim() !== "" && (
            <div className={styles.search_results}>
              <SearchResults />
            </div>
          )}
        </div>
        <div className={styles.icons_box}>
          <Link to="/wishlist" className={styles.icon_wrapper}>
            <FaRegHeart />
            {wishlist.length > 0 && (
              <span className={styles.counter}>{wishlist.length}</span>
            )}
          </Link>

          <Link to="/checkout" className={styles.icon_wrapper}>
            <LuShoppingCart />
            {totalQuantity > 0 && (
              <span className={styles.counter}>{totalQuantity}</span>
            )}
          </Link>

          <div onClick={toggleTheme} className={styles.icon_wrapper}>
            {theme === "dark" ? <LightMode /> : <DarkMode />}
          </div>

          <div className={styles.lang_toggle}>
            <img
              src={i18n.language === "az" ? azFlag : ruFlag}
              alt="flag"
              onClick={() => setIsLangOpen(!isLangOpen)}
            />
            {isLangOpen && (
              <div className={styles.lang_dropdown}>
                <div
                  onClick={() =>
                    changeLang(i18n.language === "az" ? "ru" : "az")
                  }
                >
                  <img
                    src={i18n.language === "az" ? ruFlag : azFlag}
                    alt="alt flag"
                  />
                  <span>{i18n.language === "az" ? "Ru" : "Az"}</span>
                </div>
              </div>
            )}
          </div>

          <Link to="/login" className={styles.icon_wrapper}>
            <FiUser />
          </Link>
        </div>
      </div>

      <Dropdown visibility={visibility} setVisibility={setVisibility} />
    </>
  );
};

export default NavbarMobile;
