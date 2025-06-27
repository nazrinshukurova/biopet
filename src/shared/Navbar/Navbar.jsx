// Navbar.jsx
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
import { useBasket } from "../../context/AddToBasket";
import { DarkMode, LightMode, Manat, RedManat } from "../../assets/Svg";
import { FinishTheOrder, ViewBasket } from "../Buttons/Buttons";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { useProducts } from "../../context/ProductContext";
import SearchResults from "../../components/SearchResults/SearchResults";

const Navbar = ({ lang }) => {
  const { totalDiscount, basketItems, basketCount, totalQuantity, totalPrice } =
    useBasket();
  const { wishlist } = useWishlist();
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const changeLang = (myLang) => {
    i18n.changeLanguage(myLang);
  };

  const handleClick = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const { user, isLogin, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { searchTerm, setSearchTerm } = useProducts();

  return (
    <>
      <div className={styles.common_navbar_container}>
        <nav className={styles.nav_container}>
          <Link to="/">
            <img className={styles.logo} src={logo} alt="logo" />
          </Link>
          <img className={styles.phone} src={phone} alt="phone" />

          <div className={styles.search_box}>
            {searchTerm.trim() !== "" && (
              <div
                className={styles.overlay}
                onClick={() => setSearchTerm("")}
              ></div>
            )}

            <div className={styles.search_container}>
              <span>
                <img width="16" height="16" src={search} alt="search icon" />
              </span>
              <input
                className={styles.search_input}
                type="text"
                placeholder={t("navbar.searchPlaceholder") || "Axtar..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {searchTerm.trim() !== "" && (
              <div className={styles.search_results}>
                <SearchResults />
              </div>
            )}
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
              <IoIosArrowDown style={{ fontWeight: "400", color: "#1d2123" }} />
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
                <div
                  className={
                    isLogin === false
                      ? styles.user_dropdown
                      : styles.user_dropdown_true
                  }
                >
                  {isLogin ? (
                    <div>
                      <div className={styles.standart}>
                        <Link
                          style={{ textDecoration: "none", color: "#1d2123" }}
                          to="/account"
                        >
                          <div
                            className={styles.user_name}
                          >{`${user.name} ${user.surname}`}</div>
                        </Link>
                        <div
                          className={styles.logout}
                          onClick={logout}
                          style={{ cursor: "pointer" }}
                        >
                          Logout
                        </div>
                      </div>
                    </div>
                  ) : (
                    <ul>
                      <li>
                        <Link to="/login">{t("navbar.login")}</Link>
                      </li>
                      <li>
                        <Link to="/register">{t("navbar.register")}</Link>
                      </li>
                    </ul>
                  )}
                </div>
              )}
            </div>

            <div className={styles.wish_and_count}>
              <Link
                style={{ textDecoration: "none", color: "#1d2123" }}
                to="/wishlist"
              >
                <FaRegHeart className={styles.heart} />
              </Link>
              <div className={styles.wishlist_count}>
                <span>{wishlist.length}</span>
              </div>
            </div>

            <div className={styles.basket_and_count}>
              <LuShoppingCart className={styles.shopping_cart} />
              <div className={styles.hidden_box}>
                <div>
                  {i18n.language === "az" ? "Səbət" : "Корзина"}:
                  {basketItems.length}{" "}
                  {i18n.language === "az" ? "məhsul" : "продукт"}
                </div>
                <div className={styles.all_basket_products}>
                  {basketItems &&
                    basketItems.map((prod) => (
                      <div key={prod.id} className={styles.basket_item}>
                        <div className={styles.product_image}>
                          <img
                            style={{ width: "70px" }}
                            src={prod.İmage}
                            alt={prod.NameAz}
                          />
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              justifyContent: "center",
                              gap: "20px",
                            }}
                          >
                            <div className={styles.product_title}>
                              {i18n.language === "az"
                                ? prod.NameAz
                                : prod.NameRu}
                            </div>
                            <div className={styles.product_count}>
                              <span
                                style={{
                                  color: "#828282",
                                  fontSize: "12px",
                                  fontWeight: "400",
                                }}
                              >
                                {i18n.language === "az" ? "Ədəd" : "Число"}:
                              </span>
                              {prod.quantity}
                            </div>
                            <div className={styles.product_price}>
                              {prod.Price}{" "}
                              <RedManat
                                height="20px"
                                width="20px"
                                color="#ED0036"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "16px 3px",
                    color: "#1d2123",
                  }}
                  className={styles.total}
                >
                  <div style={{ fontSize: "14px" }}>
                    {i18n.language === "az" ? "Total məbləğ" : "Всего мэблэг"}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "14px",
                      gap: "5px",
                    }}
                  >
                    <div style={{ fontWeight: "400" }}>
                      {(totalPrice - totalDiscount).toFixed(2)}
                    </div>
                    <RedManat height="14px" width="14px" color="#1d2123" />
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "10px",
                  }}
                >
                  <ViewBasket />
                  <Link style={{ textDecoration: "none" }} to="/checkout">
                    <FinishTheOrder
                      text={
                        i18n.language === "az"
                          ? "Sifarişi tamamlayın"
                          : "Завершить заказ"
                      }
                    />
                  </Link>
                </div>
              </div>
              <div className={styles.wishlist_count}>
                <span>{totalQuantity}</span>
              </div>
            </div>
          </div>
        </nav>

        <div className={styles.navbar_down_part}>
          <ul>
            <li>
              <Link
                style={{ textDecoration: "none", color: "#1d2123" }}
                className={styles.link}
                to="/"
              >
                {t("Home")}
              </Link>
            </li>
            <li>
              <Link
                style={{ textDecoration: "none", color: "#1d2123" }}
                className={styles.link}
                to="/products"
              >
                {t("navbarLinks.Məhsullar")}
              </Link>
            </li>
            {user?.email === "nazrin@gmail.com" && (
              <li>
                <Link
                  style={{ textDecoration: "none", color: "#1d2123" }}
                  className={styles.link}
                  to="/dashboard"
                >
                  Dashboard
                </Link>
              </li>
            )}
            <li>
              <Link
                style={{ textDecoration: "none", color: "#1d2123" }}
                className={styles.link}
                to="/blogs"
              >
                {t("navbarLinks.Bloqlar")}
              </Link>
            </li>
            <li>
              <Link
                style={{ textDecoration: "none", color: "#1d2123" }}
                className={styles.link}
                to="/faq"
              >
                {t("navbarLinks.FAQ")}
              </Link>
            </li>
            <li>
              <Link
                style={{ textDecoration: "none", color: "#1d2123" }}
                className={styles.link}
                to="/products/discounted_products"
              >
                {t("navbarLinks.Endirimlər")}
              </Link>
            </li>
            <li>
              <Link
                style={{ textDecoration: "none", color: "#1d2123" }}
                className={styles.link}
                to="/about"
              >
                {t("about_title")}
              </Link>
            </li>
            <li onClick={toggleTheme}>
              {theme === "dark" ? <LightMode /> : <DarkMode />}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
