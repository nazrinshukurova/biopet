import React from "react";
import styles from "./Register.module.css";
import { useTranslation } from "react-i18next";

const RegisterForm = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t("register")}</h1>
      <div className={styles.subtitle_container}>
        <p className={styles.subtitle}>"{t("subtitle")}"</p>
      </div>
      <label className={styles.phone_label}>{t("phone")}</label>
      <div className={styles.phoneInput}>
        <span>+994</span>
        <input type="text" placeholder=" 00 000 00 00" />
      </div>
      <div className={styles.checkbox}>
        <input type="checkbox" id="terms" />
        <label htmlFor="terms">{t("terms")}</label>
      </div>
      <button className={styles.registerButton}>{t("register_button")}</button>
      <p className={styles.or}>{t("other_methods")}</p>
      <div className={styles.socials}>
        <button className={styles.google}>G</button>
        <button className={styles.facebook}>f</button>
      </div>
      <p className={styles.footer}>
        {t("already_registered")} <a href="#">{t("login")}</a>
      </p>
    </div>
  );
};

export default RegisterForm;
