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
            <li className={styles.linkItem}>{t("about")}</li>
            <li className={styles.linkItem}>{t("delivery")}</li>
            <li className={styles.linkItem}>{t("privacy")}</li>
            <li className={styles.linkItem}>{t("agreement")}</li>
            <li className={styles.linkItem}>{t("feedback")}</li>
          </ul>
        </div>

        <div className={styles.column}>
          <h3 className={styles.columnTitle}>{t("popularCategories")}</h3>
          <ul className={styles.linkList}>
            <li className={styles.linkItem}>{t("catFood")}</li>
            <li className={styles.linkItem}>{t("catLitter")}</li>
            <li className={styles.linkItem}>{t("sterilizedCatFood")}</li>
            <li className={styles.linkItem}>{t("deworming")}</li>
            <li className={styles.linkItem}>{t("carriers")}</li>
            <li className={styles.linkItem}>{t("dogFood")}</li>
            <li className={styles.linkItem}>{t("dogToys")}</li>
            <li className={styles.linkItem}>{t("dogVitamins")}</li>
            <li className={styles.linkItem}>{t("catBreeds")}</li>
            <li className={styles.linkItem}>{t("dogBreeds")}</li>
          </ul>
        </div>

        <div className={styles.column}>
          <h3 className={styles.columnTitle}>{t("popularBrands")}</h3>
          <ul className={styles.linkList}>
            <li className={styles.linkItem}>Royal Canin</li>
            <li className={styles.linkItem}>ACANA</li>
            <li className={styles.linkItem}>Orijen</li>
            <li className={styles.linkItem}>Proplan</li>
            <li className={styles.linkItem}>Feliks</li>
            <li className={styles.linkItem}>Canina</li>
            <li className={styles.linkItem}>Monge</li>
            <li className={styles.linkItem}>Gemon</li>
          </ul>
        </div>

        <div className={styles.column}>
          <h3 className={styles.columnTitle}>{t("help")}</h3>
          <ul className={styles.linkList}>
            <li className={styles.linkItem}>{t("faq")}</li>
            <li className={styles.linkItem}>{t("pricing")}</li>
            <li className={styles.linkItem}>{t("branches")}</li>
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
