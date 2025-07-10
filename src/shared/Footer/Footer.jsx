import React from "react";
import styles from "./Footer.module.css";
import {
  FaPhoneAlt,
  FaWhatsapp,
  FaTiktok,
  FaYoutube,
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import master from "../../assets/svg/master.svg";
import g_pay from "../../assets/svg/g-pay.svg";
import apple_pay from "../../assets/svg/apple-pay.svg";
import visa from "../../assets/svg/visa.svg";
import { useTheme } from "../../context/ThemeContext";

const Footer = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <footer
      className={`${styles.footer} ${
        theme === "dark" ? "dark-mode" : "light-mode"
      }`}
    >
      <div className={styles.container}>
        <div>
          <div className={styles.contactBox}>
            <FaPhoneAlt />
            <span>876</span>
          </div>
          <div className={styles.contactBox}>
            <FaWhatsapp />
            <span>+99450 400 08 76</span>
          </div>
          <div className={styles.socialIcons}>
            <div className={styles.socialIcon}>
              <FaTiktok />
            </div>
            <div className={styles.socialIcon}>
              <FaYoutube />
            </div>
            <div className={styles.socialIcon}>
              <FaInstagram />
            </div>
            <div className={styles.socialIcon}>
              <FaFacebookF />
            </div>
            <div className={styles.socialIcon}>
              <FaLinkedinIn />
            </div>
          </div>
        </div>

        <div className={styles.column}>
          <h3 className={styles.columnTitle}>{t("biopetStore")}</h3>
          <ul className={styles.linkList}>
            <li className={styles.linkItem}>
              <Link to="/about">{t("about")}</Link>
            </li>
            <li className={styles.linkItem}>
              <Link to="/delivery">{t("delivery")}</Link>
            </li>
            <li className={styles.linkItem}>
              <Link to="/privacy">{t("privacy")}</Link>
            </li>
            <li className={styles.linkItem}>
              <Link to="/agreement">{t("agreement")}</Link>
            </li>
            <li className={styles.linkItem}>
              <Link to="/contact">{t("feedback")}</Link>
            </li>
          </ul>
        </div>

        <div className={styles.column}>
          <h3 className={styles.columnTitle}>{t("popularCategories")}</h3>
          <ul className={styles.linkList}>
            <li className={styles.linkItem}>
              <Link to="/products?category=cat_food">{t("catFood")}</Link>
            </li>
            <li className={styles.linkItem}>
              <Link to="/products?category=cat_litter">{t("catLitter")}</Link>
            </li>
            <li className={styles.linkItem}>
              <Link to="/products?category=sterilized">
                {t("sterilizedCatFood")}
              </Link>
            </li>
            <li className={styles.linkItem}>
              <Link to="/products?category=deworming">{t("deworming")}</Link>
            </li>
            <li className={styles.linkItem}>
              <Link to="/products?category=carriers">{t("carriers")}</Link>
            </li>
            <li className={styles.linkItem}>
              <Link to="/products?category=dog_food">{t("dogFood")}</Link>
            </li>
            <li className={styles.linkItem}>
              <Link to="/products?category=dog_toys">{t("dogToys")}</Link>
            </li>
            <li className={styles.linkItem}>
              <Link to="/products?category=dog_vitamins">
                {t("dogVitamins")}
              </Link>
            </li>
            <li className={styles.linkItem}>
              <Link to="/blogs?tag=cat">{t("catBreeds")}</Link>
            </li>
            <li className={styles.linkItem}>
              <Link to="/blogs?tag=dog">{t("dogBreeds")}</Link>
            </li>
          </ul>
        </div>

        <div className={styles.column}>
          <h3 className={styles.columnTitle}>{t("popularBrands")}</h3>
          <ul className={styles.linkList}>
            <li className={styles.linkItem}>
              <Link to="/products?brand=royal-canin">Royal Canin</Link>
            </li>
            <li className={styles.linkItem}>
              <Link to="/products?brand=acana">ACANA</Link>
            </li>
            <li className={styles.linkItem}>
              <Link to="/products?brand=orijen">Orijen</Link>
            </li>
            <li className={styles.linkItem}>
              <Link to="/products?brand=proplan">Proplan</Link>
            </li>
            <li className={styles.linkItem}>
              <Link to="/products?brand=feliks">Feliks</Link>
            </li>
            <li className={styles.linkItem}>
              <Link to="/products?brand=canina">Canina</Link>
            </li>
            <li className={styles.linkItem}>
              <Link to="/products?brand=monge">Monge</Link>
            </li>
            <li className={styles.linkItem}>
              <Link to="/products?brand=gemon">Gemon</Link>
            </li>
          </ul>
        </div>

        <div className={styles.column}>
          <h3 className={styles.columnTitle}>{t("help")}</h3>
          <ul className={styles.linkList}>
            <li className={styles.linkItem}>
              <Link to="/faq">{t("faq")}</Link>
            </li>
            <li className={styles.linkItem}>
              <Link to="/pricing">{t("pricing")}</Link>
            </li>
            <li className={styles.linkItem}>
              <Link to="/branches">{t("branches")}</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.footer_bottom}>
        <div className={styles.copyright}>
          © 2025 Biopet Shop &nbsp;<span>VÖEN: 2006199541</span>
        </div>
        <div className={styles.cards}>
          <div className={styles.card_item}>
            <img src={visa} alt="Visa" />
          </div>
          <div className={styles.card_item}>
            <img src={master} alt="MasterCard" />
          </div>
          <div className={styles.card_item}>
            <img src={g_pay} alt="Google Pay" />
          </div>
          <div className={styles.card_item}>
            <img src={apple_pay} alt="Apple Pay" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
