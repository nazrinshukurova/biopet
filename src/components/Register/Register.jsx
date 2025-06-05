import React, { useState } from "react";
import styles from "./Register.module.css";
import { useTranslation } from "react-i18next";
import { Facebook, Google } from "../../assets/Svg";
import Footer from "../../shared/Footer/Footer";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Adjust path if needed

const RegisterForm = () => {
  const { t } = useTranslation();
  const { register, authErrors } = useAuth();

  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleRegister = async () => {
    const success = await register({
      phone,
      name,
      surname,
      email,
      password,
      terms: termsAccepted,
    });

    if (success) {
      alert(t("register_success"));
      setPhone("");
      setName("");
      setSurname("");
      setEmail("");
      setPassword("");
      setTermsAccepted(false);
    }
  };

  return (
    <div className={styles.full_container}>
      <div className={styles.container}>
        <h1 className={styles.title}>{t("register")}</h1>
        <div className={styles.subtitle_container}>
          <p className={styles.subtitle}>"{t("subtitle")}"</p>
        </div>

        <div className={styles.phone_container}>
          <label className={styles.phone_label}>{t("phone")}</label>
          <div className={styles.phoneInput}>
            <span className={styles.phone_prefix}>+994 </span>
            <input
              type="text"
              placeholder="00 000 00 00"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          {authErrors?.phone && <p className={styles.error}>{authErrors.phone}</p>}
        </div>

        <div className={styles.phone_container}>
          <label className={styles.phone_label}>{t("name")}</label>
          <div className={styles.phoneInput}>
            <input
              type="text"
              placeholder={t("name_placeholder")}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          {authErrors?.name && <p className={styles.error}>{authErrors.name}</p>}
        </div>

        <div className={styles.phone_container}>
          <label className={styles.phone_label}>{t("surname")}</label>
          <div className={styles.phoneInput}>
            <input
              type="text"
              placeholder={t("surname_placeholder")}
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </div>
          {authErrors?.surname && <p className={styles.error}>{authErrors.surname}</p>}
        </div>

        <div className={styles.phone_container}>
          <label className={styles.phone_label}>{t("email")}</label>
          <div className={styles.phoneInput}>
            <input
              type="text"
              placeholder={t("email_placeholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {authErrors?.email && <p className={styles.error}>{authErrors.email}</p>}
        </div>

        <div className={styles.phone_container}>
          <label className={styles.phone_label}>{t("password")}</label>
          <div className={styles.phoneInput}>
            <input
              type="password"
              placeholder={t("password_placeholder")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {authErrors?.password && <p className={styles.error}>{authErrors.password}</p>}
        </div>

        <div className={styles.checkbox}>
          <input
            className={styles.checkbox_container}
            type="checkbox"
            id="terms"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
          />
          <label className={styles.terms} htmlFor="terms">
            {t("terms")}
          </label>
        </div>
        {authErrors?.terms && <p className={styles.error}>{authErrors.terms}</p>}
        {authErrors?.general && <p className={styles.error}>{authErrors.general}</p>}

        <button className={styles.registerButton} onClick={handleRegister}>
          {t("register_button")}
        </button>

        <p className={styles.or}>{t("other_methods")}</p>
        <div className={styles.socials}>
          <button className={styles.google}><Google /></button>
          <button className={styles.facebook}><Facebook /></button>
        </div>

        <p className={styles.footer}>
          {t("already_registered")} <Link to="/login">{t("login")}</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
