import React, { useState } from "react";
import styles from "./Login.module.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Adjust path if needed
import { SuccesAlert } from "../../shared/ReusableItems/Reusable";

const Login = () => {
  const { t, i18n } = useTranslation();
  const { login, authErrors } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleLogin = async () => {
    const success = await login({ email, password, terms: termsAccepted });

    if (success) {
      setShowAlert(true); // Alert göstər
      setEmail("");
      setPassword("");

      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    }
  };

  return (
    <div className={styles.full_container}>
      {showAlert && (
        <SuccesAlert
          text={i18n.language === "az" ? "Xoş gəldiniz" : "Добро пожаловать."}
        />
      )}
      <div className={styles.container}>
        <h1 className={styles.title}>{t("login")}</h1>

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
        </div>

        <div className={styles.checkbox}>
          <input
            className={styles.checkbox_container}
            type="checkbox"
            id="terms"
            checked={termsAccepted}
            onChange={() => setTermsAccepted(!termsAccepted)}
          />
          <label className={styles.terms} htmlFor="terms">
            {t("terms")}
          </label>
        </div>

        {authErrors?.terms && (
          <p className={styles.error}>{authErrors.terms}</p>
        )}
        {authErrors?.general && (
          <p className={styles.error}>{authErrors.general}</p>
        )}

        <button
          className={styles.registerButton}
          onClick={handleLogin}
          disabled={!termsAccepted} // Terms qəbul edilməyibsə button disabled olacaq
          style={{
            backgroundColor: termsAccepted ? "#00bfa6" : "#ccc",
            cursor: termsAccepted ? "pointer" : "not-allowed",
          }}
        >
          {t("register_button")}
        </button>

        <p className={styles.footer}>
          {t("login_text")}{" "}
          <Link to="/register">{t("create_account_text")}</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
