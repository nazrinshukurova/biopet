import React from "react";
import styles from "./Register.module.css";
import { useTranslation } from "react-i18next";
import { Facebook, Google } from "../../assets/Svg";

const RegisterForm = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <div className={styles.full_container}>
        <div className={styles.container}>
          <h1 className={styles.title}>{t("register")}</h1>
          <div className={styles.subtitle_container}>
            <p className={styles.subtitle}>"{t("subtitle")}"</p>
          </div>
          <div className={styles.phone_container}>
            {" "}
            <label className={styles.phone_label}>{t("phone")}</label>
            <div className={styles.phoneInput}>
              <span className={styles.phone_prefix}>+994 </span>
              <input type="number" placeholder=" 00 000 00 00" />
            </div>
          </div>
          <div className={styles.phone_container}>
            {" "}
            <label className={styles.phone_label}>{t("name")}</label>
            <div className={styles.phoneInput}>
              <input type="text" placeholder={t("name_placeholder")} />
            </div>
          </div>
          <div className={styles.phone_container}>
            {" "}
            <label className={styles.phone_label}>{t("lastname")}</label>
            <div className={styles.phoneInput}>
              <input type="text" placeholder={t("surname_placeholder")} />
            </div>
          </div>
          <div className={styles.phone_container}>
            {" "}
            <label className={styles.phone_label}>{t("email")}</label>
            <div className={styles.phoneInput}>
              <input type="text" placeholder={t("email_placeholder")} />
            </div>
          </div>
          <div className={styles.checkbox}>
            <input
              className={styles.checkbox_container}
              type="checkbox"
              id="terms"
            />
            <label className={styles.terms} htmlFor="terms">
              {t("terms")}
            </label>
          </div>
          <button className={styles.registerButton}>
            {t("register_button")}
          </button>
          <p className={styles.or}>{t("other_methods")}</p>
          <div className={styles.socials}>
            <button className={styles.google}>
              <Google />
            </button>
            <button className={styles.facebook}>
              <Facebook />
            </button>
          </div>
          <p className={styles.footer}>
            {t("already_registered")} <a href="#">{t("login")}</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
