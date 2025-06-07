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
import { Manat, RedManat } from "../../assets/Svg";
import { FinishTheOrder, ViewBasket } from "../Buttons/Buttons";
import { useWishlist } from "../../context/WishlistContext";

const Navbar = ({ lang }) => {
  const {
    totalDiscount,
    basketItems,
    basketCount,
    totalQuantity,
    quantity,
    totalPrice,
  } = useBasket();

  const {wishlist}=useWishlist()

  console.log(wishlist)

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
          <Link to="/">
            {" "}
            <img className={styles.logo} src={logo} alt="logo" />
          </Link>{" "}
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
                <span>{wishlist.length}</span>
              </div>
            </div>
            <div className={styles.basket_and_count}>
              <LuShoppingCart className={styles.shopping_cart} />
              <div className={styles.hidden_box}>
                <div>
                  {" "}
                  {i18n.language === "az" ? "Səbət" : "Корзина"}:
                  {basketItems.length}{" "}
                  {i18n.language === "az" ? "məhsul" : "продукт"}
                </div>
                <div className={styles.all_basket_products}>
                  {" "}
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
                    {i18n.language === "az" ? "Total məbləğ" : "Всего мэблэг"}{" "}
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
                {/* Sebete kec sifarisi tamamla hissesi */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "10px",
                  }}
                >
                  <ViewBasket />
                  <FinishTheOrder />
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
